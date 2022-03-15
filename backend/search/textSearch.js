function handleRequest() {
    const requestBody = JSON.parse(context.request.body);

    if (requestBody.query == undefined || requestBody.query.length < 1) return {}

    const queryValue = requestBody.query[0].value
    const includeFields = requestBody.query[0].includeFields

    return {
        esPath: "/app-store-data/_search",
        esBody: {
            query: {
                multi_match: {
                    query: queryValue,
                    fields: ["Name", "Description"]
                }
            },
            _source: {
                includes: includeFields
            }
        }
    }
}