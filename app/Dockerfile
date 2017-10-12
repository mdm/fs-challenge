FROM node:8.6.0
WORKDIR /app/frontend
COPY frontend/package.json /app/frontend
RUN npm install && npm run build
WORKDIR /app/backend
COPY backend/package.json /app/backend
RUN npm install
CMD ["node", "index.js"]
