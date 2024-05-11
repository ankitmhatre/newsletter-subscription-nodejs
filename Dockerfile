# Use official Node.js image as base
FROM node:14

# Set working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if exists) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port on which the app runs
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"] 
