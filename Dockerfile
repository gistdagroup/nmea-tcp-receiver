FROM mhart/alpine-node:7

RUN apk add --update bash git \
    && rm -rf /var/cache/apk/*

RUN mkdir -p /apps
WORKDIR /apps
ADD . /apps

EXPOSE 3000
CMD node tcp.js
