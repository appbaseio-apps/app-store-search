# Backend

The backend is built on top of ReactiveSearch pipelines and [bert-as-service](https://github.com/hanxiao/bert-as-service).

## How?

Two pipelines are created here. One to index the data (with vectorization). One to search the vectored data. In both cases we are using the `bert-as-service` package to vectorize the input.

### Index Pipeline

Index pipeline is just a normal pipeline that indexes data to ElasticSearch with an extra step that captures vectors of the following fields:

- Name
- Description

Above fields are stored as `dense_vector` so that it can be easily searched in the [Search Pipeline](#search-pipeline)

### Search Pipeline

Search pipeline supports both text based search as well as aNN search. In text based, the term is matched as is using ES. In aNN, the vectorized data is utilized to provide more relatable results.

## Requirements

- ElasticSearch 8.1 or more (`dense_vector` is not supported in lower versions)
