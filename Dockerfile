FROM node:alpine AS builder

# Define build arguments
ARG DB_USER
ARG DB_PASS
ARG DB_HOST
ARG DB_NAME
ARG LOG_FILENAME
ARG PORT


# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install && npm install -g ts-node

RUN ls -la

# Copy the rest of the application code
COPY . .

# Build your Prisma client during the build
RUN npx prisma generate

# Build TypeScript source code
RUN npm run build

# Set the DATABASE_URL environment variable
ENV DATABASE_URL=postgresql://$DB_USER:$DB_PASS@$DB_HOST:5432/$DB_NAME
# Set LOGS_PATH environment variable
ENV LOG_FILENAME=$LOG_FILENAME
# Set PORT enviroment variable
ENV PORT=$PORT

# Expose port
EXPOSE $PORT

# Command to run the application
CMD ["npm", "start"]
