FROM mhart/alpine-node:7

RUN apk add --update bash git \
    && rm -rf /var/cache/apk/*

RUN mkdir -p /apps
WORKDIR /apps
ADD . /apps
RUN npm install && npm run build && npm prune --production

EXPOSE 3000
CMD npm run prod
