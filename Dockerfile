
# FROM node:14 AS development

# WORKDIR /usr/app

# COPY package*.json ./
# COPY prisma/ ./prisma


# RUN yarn install --network-timeout 10000

# COPY . .

# RUN yarn build

# FROM node:14 as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/app

# COPY package*.json ./

# RUN yarn install --network-timeout 10000

# COPY . .

# COPY --from=development /usr/app/dist ./dist
# COPY --from=development /usr/app/prisma ./prisma

# EXPOSE 3000

# CMD ["yarn", "start:migrate:prod"]



# FROM node:14 AS development

# WORKDIR /usr/app

# COPY package*.json ./
# COPY prisma/ ./prisma


# RUN yarn install --network-timeout 10000

# COPY . .


# FROM node:14 as builder

# WORKDIR /usr/app

# COPY package*.json ./
# COPY tsconfig.build.json ./

# RUN yarn install --network-timeout 100000

# RUN yarn build
# COPY . .



FROM node:14

WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig.build.json ./

# COPY --from=builder /usr/app ./
COPY prisma/ ./prisma


RUN yarn install --network-timeout 100000
RUN yarn build

COPY . .


EXPOSE 3000

CMD ["yarn", "start:prod"]
