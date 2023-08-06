FROM node:latest AS install-stage
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json package-lock.json .
RUN yarn --frozen-lockfile

FROM install-stage AS modules-building-stage
RUN yarn --pure-lockfile --production

FROM install-stage AS building-stage
COPY . .
CMD ["yarn", "build"]

FROM node:latest AS production-stage
RUN mkdir -p /usr/app/node_modules
WORKDIR /usr/app/node_modules
COPY --from=modules-building-stage /usr/app/node_modules .
RUN mkdir -p /usr/app/.next
WORKDIR /usr/app/.next
COPY --from=building-stage /usr/app/.next .
RUN chmod 777 .

USER 1001
EXPOSE 3000
CMD ["yarn", "start"]