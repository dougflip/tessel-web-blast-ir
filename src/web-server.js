'use strict'

var http = require('http');
var anyBody = require('body/any');

var indexHtml = require('./index-html');

var routeMap = {
  '/': processIndex,
  '/single-blast': processSingleBlast
};

function createServer(port, ir){
  return http.createServer(buildRequestHandler(ir)).listen(port);
}

function buildRequestHandler(ir){
  return function blastirRequestHandler(req, res){
    var url = req.url.toString();
    var handler = routeMap[url] || processNotFound;
    return handler(req, res, ir); 
  }
}

function processNotFound(req, res){
  console.log('Rendering 404...', req.url.toString());
  res.writeHead(404, {'Content-Type': 'text/plain'});
  return res.end('The requested url cannot be found');
}

function processIndex(req, res){
  console.log('Rendering index html...');
  res.writeHead(200, {'Content-Type': 'text/html'});
  return res.end(indexHtml);
}

function processSingleBlast(req, res, ir){
  return anyBody(req, res, {}, function(err, body){
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
}

module.exports = {
  createServer: createServer
}
