# Use a lightweight node image for building the application
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
RUN npm ci --ignore-scripts && npm install -g ts-node && npm cache clean --force

# Copy the rest of the application code
COPY . .

# Generate Prisma client and build TypeScript source code
RUN npx prisma generate && npm run build

# Run prisma migration
RUN DATABASE_URL=postgresql://$DB_USER:$DB_PASS@$DB_HOST:5432/$DB_NAME npx prisma migrate deploy

# Use a separate image for the runtime to keep it small
FROM node:alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the build output and required files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/prisma ./prisma

# Set the DATABASE_URL environment variable
ENV DATABASE_URL=postgresql://$DB_USER:$DB_PASS@$DB_HOST:5432/$DB_NAME
# Set LOGS_PATH environment variable
ENV LOG_FILENAME=$LOG_FILENAME
# Set PORT environment variable
ENV PORT=$PORT

# Expose the port
EXPOSE $PORT

# Command to run the application using the compiled JavaScript files
CMD ["node", "dist/app.js"]
