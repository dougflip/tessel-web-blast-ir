'use strict'

function ConnectionManager(){
  this.connections = [];
}

ConnectionManager.prototype.addConnection = function(conn){
  this.connections.push(conn);
}

ConnectionManager.prototype.removeConnection = function(conn){
  var indexToRemove = this.connections.indexOf(conn);
  this.connections.splice(indexToRemove, 1);
}

ConnectionManager.prototype.sendToAllConnections = function(data){
  this.connections.forEach(currySendIrData(data));
}

function currySendIrData(data){
  return function sendIrData(conn){
    conn.sendText(JSON.stringify(data));
  }
}

module.exports = ConnectionManager
