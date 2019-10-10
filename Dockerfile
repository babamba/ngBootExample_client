FROM node:8
MAINTAINER NG
EXPOSE 4200
RUN npm install
RUN npm install -g @angular/cli