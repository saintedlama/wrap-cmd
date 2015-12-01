# wrap-cmd
Minimal node module only useful on windows to create wrapper .cmd scripts
to wrap node scripts into executable .cmd files.

Usage: wrap-cmd script.js

Output

```
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe" "PATH_TO_SCRIPT\bin.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node "PATH_TO_SCRIPT\bin.js" %*
)
```
