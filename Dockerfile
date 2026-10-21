FROM oven/bun:1

WORKDIR /app

COPY package.json package-lock.json ./
RUN bun install --production --no-save

COPY index.ts index.html ./

ENV PORT=8080
EXPOSE 8080

CMD ["bun", "run", "index.ts"]
