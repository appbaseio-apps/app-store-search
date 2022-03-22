function handleRequest() {
    const requestBody = JSON.parse(context.request.body);

    if (requestBody.query == undefined || requestBody.query.length < 1) return {}

    const queryValue = requestBody.query[0].value
    const includeFields = requestBody.query[0].includeFields
    const ids = requestBody.query.map(q => q.id);

    queryToPass = {
        multi_match: {
            query: queryValue,
            fields: ["Name", "Description"]
        }
    }

    if (queryValue == undefined) {
        queryToPass = {
            match_all: {}
        }
    }

    return {
        esPath: "/app-store-data/_search",
        esBody: {
            query: queryToPass,
            _source: {
                includes: includeFields
            }
        },
        queryIds: ids
    }
}