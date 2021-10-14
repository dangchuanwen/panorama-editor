FROM node:15
WORKDIR /app
COPY package.json .
COPY .env .
RUN npm install
ADD client ./client
ADD dist ./dist
EXPOSE 4000
CMD ["npm", "run", "start:prod"]
