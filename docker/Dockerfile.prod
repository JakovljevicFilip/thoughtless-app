FROM node:20 AS build
WORKDIR /app

COPY . .
RUN npm ci
RUN npx quasar build

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/spa /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
