FROM node:13  

COPY package.json package-lock.json ./
RUN npm install && mkdir /app && mv ./node_modules ./app

WORKDIR /app

COPY . .

RUN npm run build
EXPOSE $PORT
CMD node server.js