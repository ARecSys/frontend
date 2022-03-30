# pull official base image
FROM node:16.13.1-alpine as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json yarn.lock ./
COPY ./src ./src
COPY ./public ./public

RUN yarn install

ARG REACT_APP_ES_URL
ENV REACT_APP_ES_URL $REACT_APP_ES_URL

ARG REACT_APP_ES_INDEX
ENV REACT_APP_ES_INDEX $REACT_APP_ES_INDEX

ARG REACT_APP_ES_CREDENTIALS
ENV REACT_APP_ES_CREDENTIALS $REACT_APP_ES_CREDENTIALS

RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.default.conf /etc/nginx/conf.d/default.conf