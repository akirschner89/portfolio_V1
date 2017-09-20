var express = require('express');
var app = express();
var router = express.Router();
var php = require('node-php')
// var bodyParser = require("body-parser");
// var emailRoute = require('./js/emailScript.js')(api);

app.use(express.static(__dirname));
// app.use(phpnode());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text());
// app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// api.use('./js/emailScript.js');
// app.use('/', api);

router.post('/contact.php', function (req, res) {
    res.send('contact.php');
  })

app.post('/contact.php', function (req, res) {
    res.send('contact.php');
  });



app.listen(process.env.PORT || 8080);