FROM node:23.10.0-alpine3.21 AS ekkofs
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY yarn.lock package.json ./
RUN yarn install 
COPY --chown=node:node . .
EXPOSE 3000
CMD [ "npm", "run", "start" ]