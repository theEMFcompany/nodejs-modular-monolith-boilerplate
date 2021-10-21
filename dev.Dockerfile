ARG image=node:10.14.2
FROM $image

ENV NODE_ENV development
RUN yarn global add pm2
RUN yarn global add typescript

WORKDIR /app

COPY package*.json ./
COPY yarn.* ./

VOLUME [ "/app" ]

EXPOSE 3000 2000

ENTRYPOINT [ "/app/scripts/docker/entrypoint.sh" ]