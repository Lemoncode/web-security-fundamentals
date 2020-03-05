# In this demo we're going to create a secure express API  

We'll start from __web-security-fundamentals\02_basic_security_express\00_start_code__ code. We can check that our API is by following the next steps:


From root solution folder:

```bash
npm i
npm start
```

Open another bash terminal and type.

```
curl localhost:3050/api/cars
```

## 1. Install dependencies

To secure our _api_, we have to start by adding packages.

```bash
npm i cors express-jwt -S
```

## 2. Update server main file

```diff
const express = require('express'),
-   bodyParser = require('body-parser');
+   bodyParser = require('body-parser'),
+   cors = require('cors'),
+   expressjwt = require('express-jwt');

const cars = require('./routes/cars');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
+app.use(cors());
+const jwtCheck = expressjwt({
+   secret: 'mysupersecretkey',
+});


-app.use('/api/cars', cars);
+app.use('/api/cars', jwtCheck, cars);

app.set('port', process.env.PORT || 3050);
app.listen(app.get('port'));

console.log(`Listening on port ${app.get('port')}`);

module.exports = app;
```

* We  have added _cors_ package. This package will configure our server to accept requests from other origins. Notice that we're using default configuration, that allows everything for all origins.

* We sync the api server with auth server by sharing the same secret _mysupersecretkey_

* For last we apply a new middleware that will handle the token validation.