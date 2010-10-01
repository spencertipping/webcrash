var listeners = [];

require('http').createServer (function (req, res) {
  var xs = /listen\?callback=(.*)/.exec(req.url);
  xs && listeners.push({response: res, callback: xs[1]});

  var ys = /send\?message=(.*)/.exec(req.url);

  if (ys) {
    for (var i = 0, l = listeners.length; i < l; ++i) {
      listeners[i].response.writeHead (200, {'Content-type': 'text/javascript'});
      listeners[i].response.end (listeners[i].callback + '("' +
        require('querystring').unescape(ys[1]).replace(/"/g, '\\"') + '")');
      // jQuery1241("aljfaf")
    }

    listeners = [];

    res.writeHead (200, {'Content-type': 'text/plain'});
    res.end ('Sent message to listeners');
  }
}).listen (8080, '0.0.0.0');
