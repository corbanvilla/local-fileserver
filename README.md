## Instructions

It loads up an nginx server that will store your datastore into a ramdisk. 

It indexes the whole directory tree on boot, to reload this it requires a container restart. This will be fixed in the future. 

Run the docker container with something like this:

'''docker run -it -p 80:80 -v /home/animcogn/data/:/data --tmpfs /usr/share/nginx/html animcogn/local-fileserver:1.0'''
