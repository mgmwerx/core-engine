FROM mhart/alpine-node:12
WORKDIR /app
COPY . .
RUN npm ci
RUN npx tsc -version
RUN npx tsc --project .

FROM mhart/alpine-node:12
WORKDIR /app
RUN ls -l
COPY . .
RUN npm ci --production

# Only copy over the node pieces we need from the above images
FROM mhart/alpine-node:slim-12
WORKDIR /app
COPY --from=0 /app/node_modules ./node_modules
COPY --from=0 /app/dist .

EXPOSE 3000
CMD ["node", "/app/bin/main.js"]
