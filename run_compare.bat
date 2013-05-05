@echo off

phantomjs compare.js http://www.google.co.uk http://www.google.com /adsense/ output/ png 1024 768

IF ERRORLEVEL 3 GOTO difference 
IF ERRORLEVEL 2 GOTO loadfail 
IF ERRORLEVEL 1 GOTO usage 

echo COMPARE PASSED OK!!!

goto exit

:difference

echo DIFFERENCE DETECTED!!!

goto exit

:loadfail

echo FAILED TO LOAD URL!!!

goto exit

:usage

echo INCORRECT USAGE!!!

:exit

pause
