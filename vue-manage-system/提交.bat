@echo off
git add .
echo on add commind...
set/p  co=  please input description of the commit?
echo comminting...
git commit -m "%co%"
git push origin master
echo success
set/p  cb=  please anykey to exit