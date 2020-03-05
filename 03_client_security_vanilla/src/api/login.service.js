const url = 'http://localhost:8887/login';

export const login = ({ username, password }) => (
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((resp) => {
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
);