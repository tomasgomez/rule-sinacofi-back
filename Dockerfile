# Use Node.js 14 as base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install dependencies
RUN npm install -g ts-node

RUN ls -la

# Copy the rest of the application code
COPY . .

# Build your Prisma client during the build
RUN npx prisma generate

# Build TypeScript source code
RUN npm run build

# Expose the port your app runs on
EXPOSE 3002

# Command to run the application
CMD ["npm", "start"]
