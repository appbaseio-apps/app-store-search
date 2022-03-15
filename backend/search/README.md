# Search

This pipeline lets users search the index in two ways:

- text
- aNN

## Usage

The search can be done by making a **POST** request to the `/app-store-data/_reactivesearch` endpoint with the following body:

```json
{
    "type": "text",
    "value": "sudoku app"
}
```

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