# --- Stage 1: Build with Node ---
FROM node:20 AS build

WORKDIR /app

# Copy the entire project so postinstall (quasar prepare) can run
COPY . .

RUN npm install

# Build only if NODE_ENV=production
ARG NODE_ENV=production
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi


# --- Stage 2: Dev environment ---
FROM node:20 AS dev
WORKDIR /app
COPY --from=build /app ./
CMD ["npx", "quasar", "dev", "--hostname", "0.0.0.0", "--port", "9000"]


# --- Stage 3: Prod environment ---
FROM nginx:1.27-alpine AS prod
COPY --from=build /app/dist/spa /usr/share/nginx/html
EXPOSE 80
