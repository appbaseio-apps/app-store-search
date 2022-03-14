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