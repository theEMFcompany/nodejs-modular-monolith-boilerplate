ARG image=node:12.22.0
FROM $image

ENV NODE_ENV development
RUN yarn global add pm2
RUN yarn global add typescript

WORKDIR /app

COPY package*.json ./
COPY yarn.* ./

RUN wget https://github.com/emcrisostomo/fswatch/releases/download/1.9.3/fswatch-1.9.3.tar.gz
RUN tar -xvzf fswatch-1.9.3.tar.gz
RUN cd fswatch-1.9.3 && ./configure && make && make install

VOLUME [ "/app" ]

EXPOSE 3000 2000

ENTRYPOINT [ "/app/scripts/docker/entrypoint.sh" ]