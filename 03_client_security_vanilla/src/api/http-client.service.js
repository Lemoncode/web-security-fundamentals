export const httpClientService = (() => {
    let headers;
    const getHeaders = () => headers;
    return {
        setHeaders: (_headers) => headers = _headers,
        get(url) {
            return fetch(url, {
                headers: getHeaders(),
            }).then((resp) => {
                if (resp.ok) {
                    return resp.json();
                }
        
                return resp.text();
            })
            .then((response) => {
                if (response instanceof String) {
                    throw response;
                }
        
                return response;
            })
        }
    };
})();