FROM node:alpine

WORKDIR /app
COPY package.json .
RUN yarn install --only=production
COPY . .

CMD ["yarn", "start"]