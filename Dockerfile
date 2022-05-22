FROM node

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . .

ENV PORT 5000

EXPOSE $PORT

VOLUME ["./app/data"]

CMD ["yarn", "dev"]


