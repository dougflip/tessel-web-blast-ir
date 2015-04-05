var fs = require('fs');
var path = require('path');
var os = require('os');

var indexHtmlTemplate = loadIndexHtmlTemplate();
var socketUrl = getLocalIp();
var socketPort = 8000;
var rgxTokens = /\{\{([\w]*)\}\}/g

function loadIndexHtmlTemplate(){
  var indexFilePath = path.join(__dirname, 'index.template.html');
  return fs.readFileSync(indexFilePath, { encoding: 'UTF8' });
}

function getLocalIp(){
  var interfaces = os.networkInterfaces();
  var ip = interfaces.en1 ? interfaces.en1[0].address : 'localhost';
  console.log('Using IP', ip);
  return ip;
}

function buildTemplate(template, valueMap){
  return template.replace(rgxTokens, function(token, match){
    return valueMap[match] || token;
  });
}

module.exports = buildTemplate(indexHtmlTemplate, { socketUrl: socketUrl, socketPort: socketPort });
