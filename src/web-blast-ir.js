'use strict'

// var tessel = require('tessel');
// var infraredlib = require('ir-attx4');
// var infrared = infraredlib.use(tessel.port['A']);

var IrMock = require('./ir-mock')
var infrared = new IrMock();
infrared.startSignaling();

var ws = require("nodejs-websocket");
var socketServer = require('./socket-server');
var webServer = require('./web-server');

socketServer.createServer(ws, 8000, infrared);
console.log('listening on port 8000');

webServer.createServer(8001, infrared);
console.log('listening on port 8001');
