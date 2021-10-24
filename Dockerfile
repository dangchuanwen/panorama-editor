FROM node:15
WORKDIR /app
COPY package.json .
COPY .env .
RUN npm install
ADD client ./client
ADD dist ./dist
ADD backstage ./backstage
EXPOSE 4000
CMD ["npm", "run", "start:prod"]
