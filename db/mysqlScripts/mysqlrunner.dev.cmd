@echo off 

ECHO **************LOCAL**************

ECHO CreateDB... 
for /f %%f in ('dir 1_CreateDB\*.sql /A:-D /s /b')  do (
	echo %%f
	mysql.exe --default-character-set=utf8 --line-numbers --host=localhost --user=deploymentUser --password=deploymentUser < %%f
	echo .
)

ECHO
ECHO DEPLOYMENT
ECHO STEP1... 
for /f %%f in ('dir 2_Deployment\step1\*.sql /A:-D /s /b')  do (
	echo %%f
	mysql.exe --default-character-set=utf8 --line-numbers --host=localhost --user=deploymentUser --password=deploymentUser javu < %%f
	echo .
)

ECHO STEP2...
for /f %%f in ('dir 2_Deployment\step2\*.sql /A:-D /s /b') do (
	echo %%f
	mysql.exe --default-character-set=utf8 --line-numbers --host=localhost --user=deploymentUser --password=deploymentUser javu < %%f
	echo .
)

ECHO STEP3...
for /f %%f in ('dir 2_Deployment\step3\*.sql /A:-D /s /b')  do (
	echo %%f
	mysql.exe --default-character-set=utf8 --line-numbers --host=localhost --user=deploymentUser --password=deploymentUser javu < %%f
	echo .
)

ECHO DONE!!!

pause