var express = require('express');
var app = express();
var api = express.Router();
// var emailRoute = require('./js/emailScript.js')(api);

app.use(express.static(__dirname));

// require('./js/emailScript.js')(api);
// app.use('/', emailRoute);


app.listen(process.env.PORT || 8080);