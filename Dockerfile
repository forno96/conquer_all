from node:16.13.1-alpine

COPY . .

ENTRYPOINT ["npm start"]