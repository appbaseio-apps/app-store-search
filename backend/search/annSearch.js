async function handleRequest() {
    const requestBody = JSON.parse(context.request.body)

    if (requestBody.type.toLowerCase() == "text") return {}

    const vectoredValue = await getVectorForData(requestBody.value);

    return {
        esPath: "/app-store-data/_knn_search",
        esBody: {
            knn: {
                field: "name_vector",
                query_vector: vectoredValue,
                k: 10,
                num_candidates: 500
            },
            fields: ["name_vector", "desc_vector"],
            _source: {
                "excludes": ["name_vector", "desc_vector"]
            }
        }
    }
}


async function getVectorForData(data) {
    const url = `${context.envs.bertURL}/encode`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: 1,
            texts: [data],
            is_tokenized: false
        })
    });

    const jsonResponse = JSON.parse(response);
    return jsonResponse.result[0];
}