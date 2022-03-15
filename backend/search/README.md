# Search

There are two pipelines that lets users search the index in two ways:

- text (`/app-store-data-text/_reactivesearch`)
- aNN (`/app-store-data-ann/_reactivesearch`)

## Text Search

This does a basic text search on the index and returns whatever data is passed. The body expected is the one expected by `/_reactivesearch`.

> We will only consider the first query in the body and this will not support multiple queries.

The following body:

```json
{
    "query": [
        {
            "id": "some ID",
            "value": "sudoku game",
            includeFields: ["Name", "Description", "URL", "Icon URL"]
        }
    ]
}
```

will convert to the following ES query that will be run against the `app-store-data` index:

```json
{
    "query": {
        "multi_match": {
            "query": "sudoku game",
            "fields": ["Name", "Description"]
        }
    },
    "_source": {
        "includes": ["Name", "Description", "URL", "Icon URL"]
    }
}
```

> Note that the query is searched against the `Description` and the `Name` field.


## aNN Search

This does an apromixate k-nearest Neighbour search on the data in the index. This is done by converting the query into a vector and matching that against the `Name` field's vector data that is stored in the `name_vector` field.

A ReactiveSearch JSON request like following:

```json
{
    "query": [
        {
            "id": "some ID",
            "value": "sudoku game",
            includeFields: ["Name", "Description", "URL", "Icon URL"]
        }
    ]
}
```

would be converted to the following ElasticSearch body:

```json
{
    "knn": {
        "field": "name_vector",
        "query_vector": [1.0, -0.2, ...],
        "k": 10,
        "num_candidates": 17000
    },
     "_source": {
        "includes": ["Name", "Description", "URL", "Icon URL"]
    }
}
```

> Note that the vector value is automatically extracted from the query.value field using `bert-as-service`.


## Index

The pipeline can work with any index, for the sake of example, the index in the pipeline file is set to `app-store-data`. This can be changed accordingly to the requirements.

The index, however requires a mapping to be set before it is created. This mapping ensures that the fields that are being stored as vectors are of proper type (so that aNN) can run and are indexable.

Following request would set the `name_vector` and the `desc_vector` field as `dense_vector` types and make them indexable with the `similarity` being set to `cosine`.

```sh
curl --location --request PUT 'https://{{host}}:{{port}}/app-store-data' \
--header 'Content-Type: application/json' \
--data-raw '{
    "mappings": {
        "properties": {
            "name_vector": {
                "type": "dense_vector",
                "dims": 768,
                "index": true,
                "similarity": "cosine"
            },
            "desc_vector": {
                "type": "dense_vector",
                "dims": 768,
                "index": true,
                "similarity": "cosine"
            }
        }
    }
}'
```

> In the above, change the `host` with the host and the `port` with the port where ES is listening to.

### Dimension of vector fields

It is important that the dimension of the vector fields are set according to the data being used in the `bert` model. It can be any of `768` or `1024`. The number should be as many there are hidden in the dataset. For example [this pretained model]() contains 768 hidden so the dimension should be set as 768:

Dimension is indicated by the `dims` field.

```json
"desc_vector": {
    "type": "dense_vector",
    "dims": 768,
    "index": true,
    "similarity": "cosine"
}
```


## Files used

We are building the endpoints by utilizing ReactiveSearch pipelines. These pipelines are automatically deployed to the cluster using the [pipelines-action](https://github.com/appbaseio/pipelines-action)

There are two different files:

1. [aNN Search Pipeline](./ann_pipeline.yaml)
2. [Text Search Pipeline](./text_pipeline.yaml)

### aNN Pipeline

This pipeline is invoked when the `/app-store-data-ann/_reactivesearch` endpoint is hit with a ReactiveSearch body.

It does the following things by utilizing the pipeline stages:

- **authorization**: Authorize the user credentials to make sure they are valid.
- **convert query to vector**: This stage uses [bert-as-service]() to convert the passed query into vectors and generate a bdoy to send to ElasticSearch.
- **determine search**: Convert the search body to the request body and update the ElasticSearch path in the context
- **elastic query**: Query ElasticSearch with the generated body and get the response
- **cleanup response**: This will update the response with just the `hits.hits` field instead of the raw response body.

### Why not update request body without using an extra step

This question might arise. Why are we using an extra step to update the request body in the context? This is because the `convert query to vector` converts the query into vector by making an external call and this call requires this script to run `asynchronously`.

According to the pipeline structure, we do not let the `async` stages update the already present stages in the context. We **do** let those stages add new data into the context.

This means, the stage that has `async: true` cannot update the `context.request`, `context.response` or `context.envs`.
