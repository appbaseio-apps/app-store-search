# Index Endpoint

This pipeline lets users index data with an extra step of adding vector data to a few fields like `Name`.

The following fields are created as `dense_vector` type.

> ElasticSearch 8.0 or higher is required for `dense_vector` type to be indexable.

### \[[Index](#index)] \[[Files Used](#files-used)]

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

## Files Used

The endpoint is defined using a pipeline file. The pipeline consists of the following steps:

- **authorization**: Authorize the user credentials to make sure they are valid.
- **convert fields to vector**: This stage uses [bert-as-service](https://github.com/hanxiao/bert-as-service) to convert the passed `Name` and `Description` field into vectors and generate a body to send to ElasticSearch.
- **merge vector**: The above generated values are merged into the request body in this stage
- **index data**: Utilize the prebuilt `elasticsearchQuery` stage to index the data into ElasticSearch.

### Why do we need a separate stage to merge vector?

We need a separate stage because the conversion stage is an `async` stage. The pipelines do not allow asynchronous stages to make changes to the already existing fields in the context. However, new fields can be added. This is why the converted vectored fields are added to context.

On the merge stage, these vectors are extracted from the context and merged into the request body.