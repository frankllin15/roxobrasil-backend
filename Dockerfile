FROM node:14

WORKDIR /usr/app
# RUN mkdir -p /opt/yarn
COPY package*.json ./
# RUN npm install -g -s --no-progress yarn && \
#     yarn && \
#     yarn run start:dev

COPY . .

EXPOSE 3000

CMD ["yarn", "start:dev"]