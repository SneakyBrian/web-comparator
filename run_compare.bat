@echo off

phantomjs compare.js http://www.google.co.uk http://www.google.com / output/ png 1024 768
phantomjs compare.js http://www.google.co.uk http://www.google.com / output/ png 768 1024
phantomjs compare.js http://www.google.co.uk http://www.google.com /adsense/ output/ png 1024 768
phantomjs compare.js http://www.google.co.uk http://www.google.com /adsense/ output/ png 768 1024
phantomjs compare.js http://www.google.co.uk http://www.google.com /analytics/ output/ png 1024 768
phantomjs compare.js http://www.google.co.uk http://www.google.com /analytics/ output/ png 768 1024

pause
