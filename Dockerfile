ARG image=node:10.14.2
FROM $image

ENV DEBIAN_FRONTEND noninteractive
ENV NODE_ENV production

RUN yarn global add pm2 typescript

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

ENV NODE_ENV production

RUN yarn install

COPY . .

RUN yarn run build

RUN rm -rf ./src

EXPOSE 3000

CMD [ "/app/scripts/docker/entrypoint.sh" ]