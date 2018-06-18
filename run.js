var express = require('express');
var request = require('request');
var Cookie = require('request-cookies').Cookie;

var _request = request.defaults({jar: true});
var app = express();
var driveUrl = 'https://docs.google.com/uc?export=download';

app.get('/driveid/:driveid', function (req, res){
    //res.send(req.params)
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
            console.log(cookie.value);
            //1fuUp1_K1SfUwponbHKJYJXxf_6vU4RoM
            options.qs.confirm = cookie.value;
            _request.head(options, function(err, response, body) {
                console.log(response.request.uri.href);
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
