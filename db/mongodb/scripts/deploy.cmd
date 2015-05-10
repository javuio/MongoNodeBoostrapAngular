@echo off 

ECHO **************LOCAL**************

ECHO Deployment... 
for /f %%f in ('dir Deployment\*.js /A:-D /s /b')  do (
	echo %%f
	mongo localhost:1333/javu < %%f
	echo .
)


ECHO DONE!!!

pause