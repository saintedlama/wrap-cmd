#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

var template =
'@IF EXIST "%~dp0\\node.exe" (\r\n' +
'  "%~dp0\\node.exe" "SCRIPTFILE" %*\r\n' +
') ELSE (\r\n' +
'  @SETLOCAL\r\n' +
'  @SET PATHEXT=%PATHEXT:;.JS;=;%\r\n' +
'  node "SCRIPTFILE" %*\r\n' +
')';

var scriptfile = process.argv[2];

if (!scriptfile) {
  console.log('Usage: wrap-cmd SCRIPTFILE');
  process.exit(1);
}

if (!fs.existsSync(scriptfile)) {
  console.log('Script ' + scriptfile + ' does not exist');
  process.exit(1);
}

var scriptfilePath = path.resolve(scriptfile);

console.log(template.replace(/SCRIPTFILE/gi, scriptfilePath));
