FROM node:12.7-alpine as nodeBuild
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build  --configuration=production--base-href=/message/

FROM nginx:1.17.1-alpine AS prod-stage
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=nodeBuild /app/dist/message-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]