var listeners = [];
require('http').createServer (function (req, res) {
  /listen/.test(req.url) && listeners.push(res);
  /send/.test(req.url) && (function () {
    for (var i = 0, l = listeners.length; i < l; ++i) {
      listeners[i].writeHead (200, {'Content-type': 'text/plain'});
      listeners[i].end (require('querystring').unescape(req.url.split('/', 3)[2]));
    }

    listeners = [];

    res.writeHead (200, {'Content-type': 'text/plain'});
    res.end ('Sent message to listeners');
  }) ();
}).listen (8080);
