async function handleRequest() {
    const requestBody = JSON.parse(context.request.body);

    const nameVector = await getVectorForData(requestBody.Name);
    const descVector = await getVectorForData(requestBody.Description);

    return {
        "name_vector": nameVector,
        "desc_vector": descVector
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