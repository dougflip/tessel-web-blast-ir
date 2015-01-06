'use strict';

var util = require('util');
var events = require('events');

function IrMock(){
  this.signalId = 0;
}
util.inherits(IrMock, events.EventEmitter);

IrMock.prototype.sendRawSignal = function(freq, code, cb){
  cb(null);
};

IrMock.prototype.emitData = function(data){
  data = data || [getRandomCode(), getRandomCode()];
  this.emit('data', data);
};

IrMock.prototype.startSignaling = function(interval){
  this.signalId = setInterval(this.emitData.bind(this), interval || 5000);
};

IrMock.prototype.stopSignaling = function(){
  clearInrerval(this.signalId);
};

function getRandomCode(){
  return Math.floor(Math.random() * 255);
}

module.exports = IrMock;
