FROM node:18-alpine

WORKDIR /app

COPY tsconfig.base.json ./
COPY package.json ./

COPY server/package.json ./server/
COPY server/tsconfig.json ./server/

COPY shared/package.json ./shared/
COPY shared/tsconfig.json ./shared/

COPY spa/package.json ./spa/
COPY spa/tsconfig.json ./spa/

RUN npm install --production

COPY server/dist ./server/dist
COPY shared/dist ./shared/dist
COPY spa/dist ./spa/dist

EXPOSE 5000

WORKDIR /app/server
CMD ["npm", "start"]

