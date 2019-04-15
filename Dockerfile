FROM node:8.7-alpine

WORKDIR /home/app

ADD package.json /home/app
RUN npm install
ADD . /home/app
RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000
