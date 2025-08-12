# ---------- Base image for building ----------
FROM node:20 AS base
WORKDIR /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# ---------- Development ----------
FROM base AS development
# Expose Quasar dev server port
EXPOSE 9000
CMD ["npm", "run", "dev"]

# ---------- Production Build ----------
FROM base AS build
RUN npm run build

# ---------- Production Server (Nginx) ----------
FROM nginx:1.27-alpine AS production
COPY --from=build /app/dist/spa /usr/share/nginx/html

# Nginx config for Vue Router SPA fallback
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
