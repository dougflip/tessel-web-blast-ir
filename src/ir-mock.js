'use strict';

const util = require('util');
const events = require('events');

class IrMock extends events.EventEmitter {
  constructor(){
    super();
    this.signalId = 0;
  }

  sendRawSignal(freq, code, cb){
    cb(null);
  }

  emitData(data = [getRandomCode(), getRandomCode()]){
    this.emit('data', data);
  }

  startSignaling(interval){
    this.signalId = setInterval(this.emitData.bind(this), interval || 5000);
  }

  stopSignaling(){
    clearInrerval(this.signalId);
  };
}

function getRandomCode(){
  return Math.floor(Math.random() * 255);
}

module.exports = IrMock;
