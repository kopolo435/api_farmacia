FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first
COPY package*.json ./

# Install dependencies inside container
RUN npm install

# Now copy the rest of the app
COPY . .

# Expose the app port
EXPOSE 3000

RUN cat package.json

# Start the app
CMD ["npm", "start"]
