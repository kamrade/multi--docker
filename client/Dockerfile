FROM node:alpine as buider
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/cong.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
