FROM node:20.6.0

WORKDIR /app

COPY package.json .

RUN npm install

EXPOSE 5173

ENV key=value

COPY . .

CMD [ "npm", "run", "dev" ]