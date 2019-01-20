# Build step

FROM node:10-alpine AS builder

WORKDIR /home/node/app
COPY . .
RUN yarn install && yarn build

# Run step

FROM nginx

COPY --from=builder /home/node/app/dist /usr/share/nginx/html