#!/usr/bin/python
import os
import json

def path_to_dict(path):
    d = {'name': os.path.basename(path)}
    if os.path.isdir(path):
        d['type'] = "directory"
        d['children'] = [path_to_dict(os.path.join(path,x)) for x in os.listdir\
(path)]
    else:
        d['type'] = "file"
        d['path'] = os.path.relpath(path, start="/")
    return d

f = open('/webroot/users.json','w')
f.write(json.dumps(path_to_dict('/data')))
f.close()
