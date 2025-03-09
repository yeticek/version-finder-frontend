# Use the official Node.js image as the base image
FROM node:20.18.0-alpine3.20

# environment variable handling JSON published with version-finder-api project
ARG API_URL
# Set environment variable
ENV API_URL=${API_URL}

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json ./

# Install the dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN yarn build

# Install a simple web server to serve the built application
RUN yarn global add serve

# Expose the port that the app runs on
EXPOSE 9998

# Command to run the application
CMD ["serve", "-s", "build", "-l", "9998"]