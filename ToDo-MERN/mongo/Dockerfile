# Use the official MongoDB base image
FROM mongo:5.0

# Copy the initialization script
COPY ./init.js /docker-entrypoint-initdb.d/

# Expose MongoDB port
EXPOSE 27017
