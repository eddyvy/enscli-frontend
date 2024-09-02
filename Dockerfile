ARG NODE_VERSION=22.6.0
ARG PNPM_VERSION=9.9.0

FROM node:${NODE_VERSION}-slim as build
WORKDIR /app
ENV NODE_ENV="production"
RUN npm install -g pnpm@$PNPM_VERSION
RUN apt-get update -qq && \
  apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false
COPY . .
RUN pnpm run build
RUN pnpm prune --prod

FROM nginx:latest
COPY --from=build /app/dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
