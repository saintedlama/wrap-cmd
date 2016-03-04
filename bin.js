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
  printUsage();
  process.exit(1);
}

if (!fs.existsSync(scriptfile)) {
  console.log('Script ' + scriptfile + ' does not exist');
  process.exit(1);
}

var isRelative = process.argv.some(function(arg) { return arg == '-r'});

var scriptfilePath = isRelative?path.join('%~dp0', scriptfile):path.resolve(scriptfile);

console.log(template.replace(/SCRIPTFILE/gi, scriptfilePath));

function printUsage() {
  console.log('Usage: wrap-cmd [options] SCRIPTFILE');
  console.log();
  console.log('Options:');
  console.log();
  console.log('  -r  Use a relative script file location. Instead of an absolute path to SCRIPTFILE %~dp0 is used');
  console.log();
  console.log('Example:');
  console.log();
  console.log('  wrap-cmd line_count.js  outputs a cmd file to execute line_count.js from a windows cmd');
}
