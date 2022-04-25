function handleRequest() {
    const requestBody = JSON.parse(context.request.body);
    const descVector = JSON.parse(context["desc_vector"]);
    const nameVector = JSON.parse(context["name_vector"]);

    return {
        request: {
            ...context.request,
            body: JSON.stringify({
                ...requestBody,
                "desc_vector": descVector.data[0].embedding,
                "name_vector": nameVector.data[0].embedding
            })
        }
    }
}