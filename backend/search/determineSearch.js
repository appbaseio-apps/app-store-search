function handleRequest() {
    return {
        request: {
            ...context.request,
            body: JSON.stringify(context.esBody)
        },
        envs: {
            ...context.envs,
            path: context.esPath
        }
    }
}