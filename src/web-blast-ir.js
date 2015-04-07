'use strict'

const ws = require("nodejs-websocket");
const irFactory = require('./ir-factory');
const socketServer = require('./socket-server');
const webServer = require('./web-server');

var infrared = irFactory.createIr();

socketServer.createServer(ws, 8000, infrared);
console.log('Socket server listening on port 8000');

webServer.createServer(8001, infrared);
console.log('Web server listening on port 8001');
