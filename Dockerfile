# syntax=docker/dockerfile:1

FROM --platform=$BUILDPLATFORM node:20-alpine3.18 as UI_BUILDER
ARG SECUTILS_URL=https://secutils.dev
ENV SECUTILS_URL $SECUTILS_URL

WORKDIR /app
COPY ["./*.json", "./yarn.lock", "./*.config.js", "./sidebars.js", "./"]
RUN set -x && yarn install
COPY ["./src", "./src"]
COPY ["./static", "./static"]
COPY ["./docs", "./docs"]
COPY ["./blog", "./blog"]
RUN set -x && yarn build

FROM nginxinc/nginx-unprivileged:alpine3.18-slim
COPY --from=UI_BUILDER ["/app/build/", "/usr/share/nginx/html/docs"]
COPY ["./config/nginx.conf", "/etc/nginx/conf.d/default.conf"]

