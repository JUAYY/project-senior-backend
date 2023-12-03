# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Install Prisma globally
RUN npm install -g prisma

# Copy the rest of the application source code to the container
COPY . .

# Generate Prisma client
RUN prisma generate

# Expose a port (if your application listens on a specific port)
EXPOSE 8080

# Define the command to run your application
CMD ["node", "index.js"]