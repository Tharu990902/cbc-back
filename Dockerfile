FROM node:20-alpine

# Create app directory

WORKDIR /app

# Install app dependencies

COPY package*.json ./


RUN npm install

# Bundle app source

COPY . .


EXPOSE 8080


CMD ["npm", "start"]
