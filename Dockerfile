# Stage 1: Build --
FROM node:22-alpine AS build

# Create working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the application for production
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy the build files to the Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration (optional)
# You can create an nginx.conf file if you need redirects for React Router
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# But in this example we will use a ConfigMap in Kubernetes

# Exponer el puerto
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]