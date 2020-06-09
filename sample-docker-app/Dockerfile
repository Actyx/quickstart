FROM node:10-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN apk add -t install-deps build-base python
RUN npm install --only=prod
RUN apk del install-deps
COPY ./*.js .

CMD ["node", "index.js"]