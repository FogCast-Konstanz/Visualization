FROM node:22-alpine AS build-stage

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install dependencies (this layer will be cached if package.json doesn't change)
RUN npm ci --only=production --silent && npm cache clean --force
RUN npm install esbuild@latest

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Start the NginX Application and docker service
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build-stage /app/dist /usr/share/nginx/
RUN chmod -R 755 /usr/share/nginx/

# Copy nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
