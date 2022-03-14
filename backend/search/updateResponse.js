function handleRequest() {
    const responseBody = JSON.parse(context.response.body);

    const extractedHits = responseBody.hits.hits;

    return {
        response: {
            ...context.response,
            body: JSON.stringify(extractedHits)
        }
    }
}