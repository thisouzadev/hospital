FROM node:16-alpine3.15

RUN apk update && apk add bash

WORKDIR /usr/app

COPY package.json ./
COPY . .

EXPOSE 3000

RUN npm install
RUN npm run build
RUN npm run seed:all

ENTRYPOINT [ "npm", "run", "start:dev" ]

