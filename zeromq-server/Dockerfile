FROM node:14-stretch

ENV workdir /var/prod

WORKDIR ${workdir}

COPY *.json .
COPY app.js .

RUN npm install

EXPOSE 3000
CMD ["node", "app.js"]