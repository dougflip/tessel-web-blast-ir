'use strict'

var ws = require("nodejs-websocket");
var irFactory = require('./ir-factory');
var socketServer = require('./socket-server');
var webServer = require('./web-server');

var infrared = irFactory.createIr();

socketServer.createServer(ws, 8000, infrared);
console.log('listening on port 8000');

webServer.createServer(8001, infrared);
console.log('listening on port 8001');
