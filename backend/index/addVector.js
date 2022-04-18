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
    const url = `${context.envs.bertURL}/post`;


    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: [{ text: data }],
            execEndpoint: "/"
        })
    });

    const jsonResponse = JSON.parse(response);
    return jsonResponse.data[0].embedding;
}