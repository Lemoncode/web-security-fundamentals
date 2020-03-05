const express = require('express'),
    // bodyParser = require('body-parser');
    bodyParser = require('body-parser'),
    cors = require('cors'),
    expressjwt = require('express-jwt');

const cars = require('./routes/cars');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const jwtCheck = expressjwt({
    secret: 'mysupersecretkey',
});


// app.use('/api/cars', cars);
app.use('/api/cars', jwtCheck, cars);

app.set('port', process.env.PORT || 3050);
app.listen(app.get('port'));

console.log(`Listening on port ${app.get('port')}`);

module.exports = app;