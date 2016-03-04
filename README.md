# wrap-cmd

Minimal node module only useful on windows to create wrapper .cmd scripts
to wrap node scripts into executable .cmd files.

## Installation
    npm i wrap-cmd -g

## Usage

```
Usage: wrap-cmd [options] SCRIPTFILE

Options:

  -r  Use a relative script file location. Instead of an absolute path to SCRIPTFILE %~dp0 is used

Example:

  wrap-cmd line_count.js  outputs a cmd file to execute line_count.js from a windows cmd
```

Output

   > node bin.js bin.js -r


```
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe" "%~dp0\bin.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node "%~dp0\bin.js" %*
)
```
