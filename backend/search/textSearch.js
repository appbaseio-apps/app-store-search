function handleRequest() {
    const requestBody = JSON.parse(context.request.body);

    if (requestBody.type.toLowerCase() == "ann") return {}

    return {
        esPath: "/app-store-data/_search",
        esBody: {
            query: {
                multi_match: {
                    query: requestBody.value,
                    fields: ["Name", "Description"]
                }
            },
            _source: {
                excludes: ["name_vector", "desc_vector"]
            }
        }
    }
}