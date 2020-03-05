const express = require('express'),
    bodyParser = require('body-parser');

const cars = require('./routes/cars');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/cars', cars);

app.set('port', process.env.PORT || 3050);
app.listen(app.get('port'));

console.log(`Listening on port ${app.get('port')}`);

module.exports = app;