FROM node:22-alpine

ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY server.js index.html ./

EXPOSE 8080
USER node

CMD ["npm", "start"]
