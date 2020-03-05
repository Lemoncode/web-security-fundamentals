# Security Client JavaScript Axios

Starting from previous demo, we're going to use _axios_ interceptors to handle the token injection and make requests.

* Install new dependencies

```bash
npm i axios -S
```

* Let's define _axios interceptors_ for our requests. Create _./src/api/interceptors.js_

```js
import axios from 'axios';

export const setUpRequest = (token) => {
    axios.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    }, (err) => {
        return Promise.reject(err);
    });
};
```

* Update _src/api/login.service.js_

```js
const url = 'http://localhost:8887/login';

/*diff*/
import axios from 'axios';

export const loginAxios = ({username, password}) => (
    axios.post(url, {username, password})
);
/*diff*/

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
```

* Update _src/app.js_

```diff
-import { login } from './api/login.service';
+import { loginAxios } from './api/login.service';
import { httpClientService } from './api/http-client.service';
+import { setUpRequest } from './api/interceptors';
+import axios from 'axios';

const readCredentials = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    return {
        username,
        password
    };
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login').addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const credentials = readCredentials();
-       login(credentials)
-           .then((data) => {
-               const { access_token } = data;
-               const headers = {
-                   'Authorization': `Bearer ${access_token}`
-               };
-               httpClientService.setHeaders(headers);
-           })
+       loginAxios(credentials)
+           .then(({ data }) => {
+               const { access_token } = data;
+               setUpRequest(access_token);
+           })
            .catch((err) => console.log(err));
    });

    document.getElementById('cars').addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
-       httpClientService.get('http://localhost:3050/api/cars')
+       axios.get('http://localhost:3050/api/cars')
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
    });
});
```