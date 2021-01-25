FROM node:14-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8085
CMD [ "node", "./server/server.js" ]