# Use the official Cypress Docker image as the base image
FROM cypress/included:latest

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "test"]