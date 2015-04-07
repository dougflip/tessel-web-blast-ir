const fs = require('fs');
const path = require('path');
const os = require('os');

const socketPort = 8000;
const rgxTokens = /\{\{([\w]*)\}\}/g

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

module.exports = buildTemplate(loadIndexHtmlTemplate(), { socketUrl: getLocalIp(), socketPort: socketPort });
