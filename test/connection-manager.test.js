'use strict'

var expect = require('chai').expect;
var sinon = require('sinon');

describe('ConnectionManager', function(){

  var ConnectionManager = require('../src/connection-manager');
  var sut, conn1, conn2;

  beforeEach(function(){
    sut = new ConnectionManager();
    conn1 = { sendText: sinon.spy() };
    conn2 = { sendText: sinon.spy() };
  });

  describe('addConnection', function(){
    
    it('should add a new connection', function(){
      sut.addConnection({});
      sut.addConnection({});
      expect(sut.connections.length).to.equal(2);
    });

  });

  describe('removeConnection', function(){

    it('should remove a connection', function(){
      sut.addConnection(conn1);
      sut.addConnection(conn2);
      sut.removeConnection(conn1);
      expect(sut.connections.length).to.equal(1);
      expect(sut.connections[0]).to.equal(conn2);
    });

  });

  describe('sendToAllConnections', function(){

    it('should not error when there are no connections', function(){
      sut.sendToAllConnections('a message');
      expect(sut.connections).to.eql([]);
    });

    it('should send to all registered connections', function(){
      sut.addConnection(conn1);
      sut.addConnection(conn2);
      sut.sendToAllConnections('a message');
      expect(conn1.sendText.calledWith(JSON.stringify('a message'))).to.be.true;
      expect(conn2.sendText.calledWith(JSON.stringify('a message'))).to.be.true;
    });

  });

});
