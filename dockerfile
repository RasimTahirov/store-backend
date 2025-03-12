FROM node:18.19.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 1200

CMD ["npm", "run", "start:prod"]
