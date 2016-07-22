FROM mhart/alpine-node:6

RUN apk add --update make gcc g++ python

RUN mkdir -p /app
WORKDIR /app
COPY package.json /app/

RUN npm install --production

RUN apk del make gcc g++ python && rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp

COPY ./dist /app

ENV NODE_ENV production

EXPOSE 3000

CMD ["npm", "run", "deploy"]
