var express = require('express');
var request = require('request');
var Cookie = require('request-cookies').Cookie;
var logger = require('morgan');

var _request = request.defaults({jar: true});
var app = express();
var driveUrl = 'https://docs.google.com/uc?export=download';


logger.format('mydate', function() {
    var df = require('log-timestamp');
    return df(new Date(), 'HH:MM:ss.l');
});
app.use(logger('[:mydate] :method :url :status :res[content-length] - :remote-addr - :response-time ms'));

app.get('/driveid/:driveid', function (req, res){
    //res.send(req.params)
    require('log-timestamp');
    var ip = (req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress).split(",")[0];
    console.log(ip + ' is connecting...');
    var id = req.params['driveid'];
    var options = {
        method: 'HEAD',
        uri: driveUrl,
        qs: {
            id: id
        }
    };

    _request.get(options, function(err, response, body) {
        var rawcookies = response.headers['set-cookie'];
        if (rawcookies){
            var cookie = new Cookie(rawcookies[0]);
            //console.log(cookie.value);
            //1fuUp1_K1SfUwponbHKJYJXxf_6vU4RoM
            options.qs.confirm = cookie.value;
            _request.head(options, function(err, response, body) {
                console.log('redirecting...');
                res.redirect(response.request.uri.href);
            });
        }
        else{
            console.log('raw cookies undefined. ')
        }
    });
});


var port = 9000;
app.listen(port);
console.log('Listening on port', port);
