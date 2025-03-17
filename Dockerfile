FROM node:20.19.0 AS ekkofs
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install 
COPY --chown=node:node . .
EXPOSE 3000
CMD [ "npm", "run", "start" ]


