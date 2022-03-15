# Search

There are two pipelines that lets users search the index in two ways:

- text (`/app-store-data-text/_reactivesearch`)
- aNN (`/app-store-data-ann/_reactivesearch`)


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