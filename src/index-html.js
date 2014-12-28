var socketUrl = require('os').networkInterfaces().en1[0].address;
var socketPort = 8000;

var indexHtml = [
'<html>',
  '<head>',
    '<title>WebBlastIr</title>',
    '<style type="text/css">',
      'body{',
        'background-color: rgb(245, 74, 66);',
      '}',
      '.ir-code{',
        'width: 50%;',
        'margin: auto;',
        'position: relative;',
        'top: 40%;',
        'padding: 1em;',
        'font-size: 1.4rem;',
        'background-color: #fff;',
        'border-radius: 5px;',
        'border: 1px solid #999;',
        'overflow-wrap: break-word;',
        'box-shadow: 0 0 24px 12px rgba(0,0,0,.3);'
      '}',
    '</style>',
  '</head>',
  '<body>',
    '<div id="irCode" class="ir-code">Waiting for data...</div>',
    '<script type="text/javascript">',
      "var socketUrl = '" + socketUrl + "';",
      "var socketPort = '" + socketPort + "';",
      "var socket = new WebSocket('ws://' + socketUrl + ':' + socketPort);",
      "var irCode = document.getElementById('irCode');",
      'socket.onmessage = function(evt){',
        'console.log(evt);',
        'irCode.innerHTML = evt.data;',
      '}',
    '</script>',
  '</body>',
'</html>'
].join('');

module.exports = indexHtml;
