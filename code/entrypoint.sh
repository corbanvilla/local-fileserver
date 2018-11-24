#!/bin/sh

echo "indexing data directory"
/usr/bin/python tree.py

echo "copying files to ramdisk"
cp -r /webroot/* /usr/share/nginx/html
cp -r /data /usr/share/nginx/html/

echo "starting nginx"
nginx -g "daemon off;"
