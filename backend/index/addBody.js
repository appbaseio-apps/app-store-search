function handleRequest() {
    const requestBody = JSON.parse(context.request.body);

    return {
        "nameBody": getBody(requestBody.Name),
        "descBody": getBody(requestBody.Description)
    }
}

function getBody(data) {
    return JSON.stringify({
        data: [{ text: data }],
        execEndpoint: "/"
    })
}