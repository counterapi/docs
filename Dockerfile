# build stage
FROM node:lts-alpine as build-stage

ENV APP_HOME=/usr/src/app

RUN mkdir -p $APP_HOME

COPY ./package*.json $APP_HOME/

RUN cd $APP_HOME && npm install

WORKDIR $APP_HOME

COPY ./ $APP_HOME

RUN cd $APP_HOME && npm run docs:build

RUN cd $APP_HOME && ls

# production stage
FROM nginx:stable-alpine as production-stage

ENV NODE_ENV=production
ENV APP_HOME=/usr/src/app

COPY --from=build-stage $APP_HOME/docs-public/.vuepress/dist /usr/share/nginx/html


RUN chown nginx:nginx /usr/share/nginx/html

# Configurations
COPY ./kubernetes/application/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]