FROM node:16.20.1-buster-slim AS BUILDER

ENV NODE_TLS_REJECT_UNAUTHORIZED 0

WORKDIR /usr/src/app

COPY package.json ./
COPY . .

RUN rm -rf ./node_modules

RUN npm set strict-ssl false \
    && npm -v \ 
    && npm i 

EXPOSE 15001

CMD [ "node", "boot.js" ]












