# Use Node.js 14 as base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript source code
RUN npm run build

# Expose the port your app runs on
EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]
