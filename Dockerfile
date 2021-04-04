FROM node:alpine as builder  

COPY package.json package-lock.json ./
RUN npm install && mkdir /app && mv ./node_modules ./app
WORKDIR /app

COPY . .

RUN npm run build 
EXPOSE $PORT


FROM nginx:1.19.9-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder ./app /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]