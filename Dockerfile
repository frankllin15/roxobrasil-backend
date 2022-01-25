
# FROM node:14 AS builder
# WORKDIR /usr/app
# COPY ./package.json ./
# COPY prisma/ ./prisma/
# RUN yarn --network-timeout 100000

# COPY . .
# RUN yarn build


# FROM node:14 AS production


# WORKDIR /usr/app

# # Install app dependencies


# ENV JWT_SECRET=de1be40278856ba63a407d0d12edd82c

# COPY . .


# COPY --from=builder /usr/app ./
# EXPOSE 3000
# CMD ["yarn", "start:migrate:prod"]


FROM node:14 AS development

WORKDIR /usr/app

COPY package*.json ./
COPY prisma/ ./prisma


RUN yarn install --network-timeout 10000

COPY . .

RUN yarn build

FROM node:14 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

COPY package*.json ./

RUN yarn install --network-timeout 10000

COPY . .

COPY --from=development /usr/app/dist ./dist
COPY --from=development /usr/app/prisma ./prisma

EXPOSE 3000

CMD ["yarn", "start:migrate:prod"]

