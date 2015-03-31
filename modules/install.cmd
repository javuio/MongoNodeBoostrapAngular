echo off
cls
echo *********************************************************
echo make sure you are running this entire shell in admin mode
echo *********************************************************
pause
echo on
cd mHash
call install.cmd
call link.cmd
cd..
cd mLogger
call install.cmd
call link.cmd
cd..
cd mDAL
call linkLogger.cmd
call install.cmd
call link.cmd
cd..
pause