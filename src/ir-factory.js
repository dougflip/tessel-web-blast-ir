'use strict';

var IrMock = require('./ir-mock');

function createIr(){
  return isLocalDevelopment() ? createIrMock() : createIrAttx4();
}

function isLocalDevelopment(){
  if(process.env.NODE_ENV === 'local') return true;

  var tessel = require('tessel');
  return !tessel.port;
}

function createIrMock(){
  var infrared = new IrMock();
  infrared.startSignaling();
  return infrared;
}

function createIrAttx4(){
  var infraredlib = require('ir-attx4');
  return infraredlib.use(tessel.port['A']);
}

module.exports = {
  createIr: createIr
};
