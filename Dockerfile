FROM node:latest
WORKDIR /usr/src/app/
COPY package.json yarn.lock ./
RUN yarn
COPY ./ ./
CMD ["yarn", "build"]