FROM mhart/alpine-node:12
WORKDIR ./app
COPY . .
RUN npm ci
RUN npx tsc -version
RUN npx tsc --project .

# Only copy over the node pieces we need from the previous images
FROM mhart/alpine-node:12
WORKDIR ./app
COPY --from=0 ./app/dist ./app/package.json ./app/package-lock.json ./
RUN npm ci --production
EXPOSE 3000
CMD ["node", "bin/main.js"]
