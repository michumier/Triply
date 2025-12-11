# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files
COPY ./client-triply/package*.json ./
RUN npm install

# Copy source and build
COPY ./client-triply/. ./
RUN npm run build

# Production stage with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY ./client-triply/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
