var express = require('express');
var path = require('path');

var app = express();
var port = 7788;

app.use(express.static(path.join(__dirname, '/public/')));

var server = app.listen(port, function() {
	console.log('Express server listening on port ' + port);
});