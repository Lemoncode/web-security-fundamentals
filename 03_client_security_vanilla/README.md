# Security Client JavaScript

We're going to create a new app that will contain a _login form_, if we're _authenticated_, the response will return a _JWT_, that we will use to call a _secure API_. If everything goes fine we well allow to access to server resources.

* For this demo we will create a new project.

```
npm init -y
```

```
npm i parcel -D
```

* Lets start by creating _index.html_ in root folder solution.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Vanilla JavaScript Security</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>

<body class="container">
    <form>
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password">
        </div>
        <button class="btn btn-primary" id="login" type="submit">Login</button>
    </form>
    <script src="./src/app.js"></script>
</body>

</html>
```

* All our solution code will be placed in __src__ folder. Create this folder in root folder solution.

* Lets create the code to handle this _form_, first we're going to create a new entry in _src/api/login.service.js_

```javascript
const url = 'http://localhost:8887/login';

export const login = ({ username, password }) => (
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {
            'Content-Type': 'application/json'
        }
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
);
```

* Now we can create _src/app.js_

```javascript
import { login } from './api/login.service';

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
        login(credentials)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => console.log(err));
    });
});
```

* Modify __package.json__ to start our app

```diff
{
  "name": "temp_auth_review",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
+   "start": "parcel index.html",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "parcel": "^1.12.3"
  }
}

```

* With our _auth_ server up and running we can check that this is already working.

* Ok, so we're retrieving our token we want to inject it so lets define _src/api/http-client.service.js_

```javascript
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
```
* Change _src/app.js_ to use the token;

```diff
import { login } from './api/login.service';
+import { httpClientService } from './api/http-client.service';

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
        login(credentials)
            .then((data) => {
-               console.log(data);
+               const { access_token } = data;
+               const headers = {
+                   'Authorization': `Bearer ${access_token}`
+               };
+               httpClientService.setHeaders(headers);
            }).catch((err) => console.log(err));
    });
});
```

* Ok, the next step is check that is already working. Lets add a new button that will call to our secure server. Edit as follows _src/index.html_

```diff
<body>
    <form>
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password">
        </div>
        <button id="login" type="submit">Login</button>
    </form>
+   <br />
+   <div class="row">
+       <button id="cars" class="btn btn-default col-2">Load cars!</button>
+   </div>
    <script src="./src/app.js"></script>
</body>
```

* Lets edit _src/app.js_ as follows

```javascript
import { login } from './api/login.service';
import { httpClientService } from './api/http-client.service';

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
        login(credentials)
            .then((data) => {
                // console.log(data);
                const { access_token } = data;
                const headers = {
                    'Authorization': `Bearer ${access_token}`
                };
                httpClientService.setHeaders(headers);
            }).catch((err) => console.log(err));
    });

    /*diff*/
    document.getElementById('cars').addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        httpClientService.get('http://localhost:3050/api/cars')
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
    });
    /*diff*/
});
```
* Lets check that is working, with and without authenticaton.