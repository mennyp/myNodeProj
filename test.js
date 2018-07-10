



var request = require('request');
var _request = request.defaults({jar: true});
var Cookie = require('request-cookies').Cookie;

_request.get('https://docs.google.com/uc?export=download&id=1fuUp1_K1SfUwponbHKJYJXxf_6vU4RoM', function(err, response, body) {
 // console.log(response.headers);
  var rawcookies = response.headers['set-cookie'];
  var cookie = new Cookie(rawcookies[0]);
  console.log(cookie.value);
  var url = 'https://docs.google.com/uc?export=download&id=1fuUp1_K1SfUwponbHKJYJXxf_6vU4RoM&confirm=' + cookie.value;
  getLocation(url)
});

function getLocation(url){
  _request.head(url, function(err, response, body) {
  //console.log(response.headers);
  console.log(response.request.uri.href);
});

}
