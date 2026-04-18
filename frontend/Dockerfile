# Use an official Node runtime as a parent image
FROM node:22-alpine

# Set work directory
WORKDIR /app

# Install dependencies separately to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy project
COPY . .

# Expose port
EXPOSE 4200

# Start command
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--disable-host-check"]
