FROM node:10-alpine
WORKDIR /usr/src/app

COPY package*.json *.js ./
RUN npm install

CMD ["node", "index.js"]
