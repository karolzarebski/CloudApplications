FROM node:16.14.2-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

COPY ./ ./

RUN npm install

CMD ["npm", "start"]