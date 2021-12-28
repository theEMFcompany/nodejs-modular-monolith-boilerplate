ARG image=node:12.22.0
FROM $image

ENV DEBIAN_FRONTEND noninteractive
ENV NODE_ENV production

RUN yarn global add pm2 typescript
RUN sed -i 's/pidusage(pids, function retPidUsage(err, statistics) {/pidusage(pids, { usePs: true }, function retPidUsage(err, statistics) {/' /usr/local/share/.config/yarn/global/node_modules/pm2/lib/God/ActionMethods.js


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