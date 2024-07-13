# Dockerfile for backend

# Use the official Node.js image
FROM node:18

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy the wait-for-it script
COPY wait-for-it.sh /usr/src/app/

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Wait for MySQL to be ready, then start the app
CMD ["./wait-for-it.sh", "mysql:3306", "--", "npm", "start"]
