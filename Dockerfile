FROM nginx:mainline-alpine

LABEL maintainer="corban@utos.org"

COPY ./webroot /webroot
COPY ./code /code
COPY nginx.conf /etc/nginx/default.conf

EXPOSE 80

RUN apk add python

WORKDIR /code

ENTRYPOINT [ "/bin/sh", "./entrypoint.sh" ]
