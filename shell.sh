#!/bin/bash

npm install

pm2 describe index > /dev/null 

RUNNING=$?
if [ "${RUNNING}" -ne 0 ];
then
pm2 start index.js
else
pm2 restart index.js
fi
