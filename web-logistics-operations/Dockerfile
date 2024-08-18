ARG NODE_VERSION=22.4.1

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000

COPY .env .env

CMD ["npm", "run", "start"]
