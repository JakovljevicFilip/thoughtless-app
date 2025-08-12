# ---------- Base build stage ----------
FROM node:20 AS base
WORKDIR /app

# Copy everything so postinstall works
COPY . .

RUN npm install

# ---------- Development stage ----------
FROM base AS development
CMD ["npx", "quasar", "dev", "-H", "0.0.0.0"]

# ---------- Production build stage ----------
FROM base AS build
RUN npx quasar build

# ---------- Production Nginx stage ----------
FROM nginx:1.27-alpine AS production
COPY --from=build /app/dist/spa /usr/share/nginx/html

# Vue Router fallback (so /thoughts works)
RUN printf 'server {\n\
  listen 80;\n\
  server_name _;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
  location / {\n\
    try_files $uri $uri/ /index.html;\n\
  }\n\
}' > /etc/nginx/conf.d/default.conf
