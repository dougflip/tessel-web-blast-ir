'use strict'

const ConnectionManager = require('./connection-manager');
const connectionManager = new ConnectionManager();

function createServer(ws, port, ir){
  ir.on('data', onIrData);
  return ws.createServer(onNewClient).listen(port);
}

function onIrData(data){
  console.log('Sending data over socket', data);
  connectionManager.sendToAllConnections(data);
}

function onNewClient(conn){
  connectionManager.addConnection(conn);
  conn.on('close', createConnectionCloseHandler(conn))
  conn.on('error', (err) => console.error('WebSocket error:', err));
}

function createConnectionCloseHandler(conn){
  return function onWsConnectionClosed(){
    connectionManager.removeConnection(conn);
  }
}

module.exports = { createServer };
