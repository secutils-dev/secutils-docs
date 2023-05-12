# syntax=docker/dockerfile:1

FROM --platform=$BUILDPLATFORM node:20-alpine3.17 as UI_BUILDER
WORKDIR /app
COPY ["./*.json", "./yarn.lock", "./*.config.js", "./sidebars.js", "./"]
RUN set -x && yarn install
COPY ["./src", "./src"]
COPY ["./static", "./static"]
COPY ["./docs", "./docs"]
RUN set -x && yarn build

FROM nginx:stable-alpine
COPY --from=UI_BUILDER ["/app/build/", "/usr/share/nginx/html/docs"]
COPY ["./config/nginx.conf", "/etc/nginx/conf.d/default.conf"]
