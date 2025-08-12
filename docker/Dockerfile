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

# Copy built files
COPY --from=build /app/dist/spa /usr/share/nginx/html

# Remove default config and add Vue Router fallback config
RUN rm /etc/nginx/conf.d/default.conf && \
    printf 'server {\n\
    listen 80;\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
    location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg|mp4)$ {\n\
        expires 6M;\n\
        access_log off;\n\
        add_header Cache-Control "public";\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf
