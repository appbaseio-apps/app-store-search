function handleRequest() {
    const requestBody = JSON.parse(context.request.body);

    return {
        request: {
            ...context.request,
            body: JSON.stringify({
                ...requestBody,
                "desc_vector": context["desc_vector"],
                "name_vector": context["name_vector"]
            })
        }
    }
}