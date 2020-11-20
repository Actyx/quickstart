FROM node:12-alpine
WORKDIR /usr/src/app

COPY package*.json ./

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --update --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies

# separate step after npm install to cache the needed node_modules layer
COPY *.js ./

CMD ["node", "index.js"]
