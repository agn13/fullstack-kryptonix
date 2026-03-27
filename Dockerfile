FROM node:18-alpine

WORKDIR /app

# Copy entire project
COPY . .

# Install backend dependencies
WORKDIR /app/backend
RUN npm install --only=production

# Expose port
EXPOSE 5000

# Set production environment
ENV NODE_ENV=production
ENV PORT=5000

# Start backend (which serves frontend from dist)
CMD ["npm", "start"]
