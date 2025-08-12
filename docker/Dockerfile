# Stage 1: Build Quasar app
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npx quasar build

# Stage 2: Serve with Nginx
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/spa /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
