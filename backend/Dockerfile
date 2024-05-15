FROM node:18-bullseye as build
COPY ./sql/make_new_user.sql /docker-entrypoint-initdb.d/
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm build

FROM build as development
WORKDIR /app
RUN npm i -g nodemon
SHELL ["/bin/bash", "-c"]
CMD ["pnpm", "dev"]z

FROM node:18-bullseye as production
WORKDIR /app
COPY ./sql/make_new_user.sql /docker-entrypoint-initdb.d/
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json .
COPY --from=build /app/pnpm-lock.yaml .
COPY --from=build /app/node_modules ./node_modules
CMD ["npm","run", "start:prod"]
