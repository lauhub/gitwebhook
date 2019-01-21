var express = require('express');
var fs = require('fs');
var path = require('path');
var morgan = require('morgan');

var app = express();

// Morgan configuration
// see http://expressjs.com/en/resources/middleware/morgan.html (single file logger)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('short', { stream: accessLogStream }))

app.get('/', function(req, res) {
  res.send('salut les poulets !');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
