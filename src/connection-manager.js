'use strict'

class ConnectionManager {
  constructor(){
    this.connections = [];
  }

  addConnection(conn){
    this.connections.push(conn);
  }

  removeConnection(conn){
    var indexToRemove = this.connections.indexOf(conn);
    this.connections.splice(indexToRemove, 1);
  }

  sendToAllConnections(data){
    this.connections.forEach(conn => sendIrData(conn, data));
  }
}

function sendIrData(conn, data){
  conn.sendText(JSON.stringify(data));
}

module.exports = ConnectionManager
