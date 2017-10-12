FROM node:8.6.0
WORKDIR /app/frontend
COPY frontend/package.json /app/frontend
RUN npm install
WORKDIR /app/backend
COPY backend/package.json /app/backend
RUN npm install
CMD ["/bin/bash", "run.sh"]
