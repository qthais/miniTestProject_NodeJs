FROM node:18-alpine
WORKDIR /FE
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD [ "npm" ,"run","dev" ]
