FROM node:22 AS build-stage

WORKDIR /app
COPY package.json .

RUN npm install
COPY . .

RUN npm install esbuild@latest
RUN npm run build

# Start the NginX Application and docker service
FROM nginx:latest

COPY --from=build-stage /app/dist /usr/share/nginx/
RUN chmod -R 755 /usr/share/nginx/

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]
