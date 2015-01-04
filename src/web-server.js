'use strict'

var http = require('http');
var anyBody = require('body/any');

var indexHtml = require('./index-html');

function createServer(port, ir){
  http.createServer(function handleRequest(req, res) {

    console.log('Incoming url of:', req.url);

    if(req.url === '/'){
      console.log('Rendering index html...');
      res.writeHead(200, {'Content-Type': 'text/html'});
      return res.end(indexHtml);
    }

    anyBody(req, res, {}, function(err, body){
      console.log('handling request', body);
      var irSignal = new Buffer(body.signal);
      ir.sendRawSignal(38, irSignal, function(err) {
        if(err){
          console.log("Error sending signal", err);
          res.writeHead(500, {'Content-Type': 'text/plain'});
          return res.end('Error while attempting to send IR:', err);
        }

        console.log("Signal sent:", body.signal);
        res.writeHead(204, {'Content-Type': 'text/plain'});
        res.end();
      });
    });

  }).listen(port);
}

module.exports = {
  createServer: createServer
}
