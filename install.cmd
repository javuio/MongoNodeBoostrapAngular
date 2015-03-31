echo off
cls
echo *********************************************************
echo make sure you are running this entire shell in admin mode
echo *********************************************************
pause
echo on
cd modules
cd mDAL
call install.cmd
call link.cmd
cd..
cd..
cd server
call linkDALs.cmd
npm install
cd..
pause