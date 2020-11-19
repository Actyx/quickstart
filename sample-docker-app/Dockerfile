FROM node:12-alpine
WORKDIR /usr/src/app

COPY package*.json *.js ./

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --update --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies

CMD ["node", "index.js"]
