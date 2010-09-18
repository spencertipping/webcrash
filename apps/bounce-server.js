var listeners = [];
require('http').createServer (function (req, res) {
  /listen/.test(req.url) && listeners.push(res);

  /app/.test(req.url) && (function () {
    require('fs').readFile (req.url.split('/', 3)[2] + '.html', 'ascii', function (err, data) {
      res.writeHead (200, {'Content-type': 'text/html'});
      res.end (data);
    });
  }) ();

  /send/.test(req.url) && (function () {
    for (var i = 0, l = listeners.length; i < l; ++i) {
      listeners[i].writeHead (200, {'Content-type': 'text/plain'});
      listeners[i].end (require('querystring').unescape(req.url.split('/', 3)[2]));
    }

    listeners = [];

    res.writeHead (200, {'Content-type': 'text/plain'});
    res.end ('Sent message to listeners');
  }) ();
}).listen (8080, '0.0.0.0');
