'use strict';

var IrMock = require('./ir-mock');
var tessel = require('tessel');
var infraredlib = require('ir-attx4');

function createIr(){
  return isLocalDevelopment() ? createIrMock() : createIrAttx4();
}

function isLocalDevelopment(){
  return !tessel.port;
}

function createIrMock(){
  var infrared = new IrMock();
  infrared.startSignaling();
  return infrared;
}

function createIrAttx4(){
  return infraredlib.use(tessel.port['A']);
}

module.exports = {
  createIr: createIr
};
