var express = require('express');
var app = express();

app.use(express.static(__dirname));

// require('./js/emailScript.js')(app);


app.listen(process.env.PORT || 8080);