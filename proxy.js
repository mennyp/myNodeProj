var proxy = require('express-http-proxy');
var app = require('express')();
 
app.use('/proxy', proxy('www.google.com'));

var port = 9000;
app.listen(port);
