FROM node:14
ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=admin

RUN mkdir -p /home/app

COPY . /home/app
RUN cd ./home/app && npm install && npm i typescript && npm run build
CMD node ./home/app/dist/server.js

EXPOSE 3000