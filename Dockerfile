# Dockerfile

# Use official Node.js 14 image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

# Expose the port the app runs on
EXPOSE 4000

# Command to run the app
CMD ["npm", "start"]
