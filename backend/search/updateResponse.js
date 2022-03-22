function handleRequest() {
    const esResponse = JSON.parse(context.response.body);

    const builtResponse = {};
    builtResponse[context.queryId] = esResponse;

    return {
        response: {
            ...context.response,
            body: JSON.stringify(builtResponse)
        }
    }
}