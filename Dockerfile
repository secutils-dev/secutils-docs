# syntax=docker/dockerfile:1

FROM --platform=$BUILDPLATFORM node:20-alpine3.19 as UI_BUILDER
ARG SECUTILS_ENV="prod"
ENV SECUTILS_ENV=${SECUTILS_ENV}

WORKDIR /app
COPY ["./*.json", "./*.config.js", "./sidebars.js", "./"]
RUN set -x && npm ci
COPY ["./src", "./src"]
COPY ["./static", "./static"]
COPY ["./docs", "./docs"]
COPY ["./blog", "./blog"]
RUN set -x && npm run build

FROM nginxinc/nginx-unprivileged:alpine3.19-slim
COPY --from=UI_BUILDER ["/app/build/", "/usr/share/nginx/html/docs"]
COPY ["./config/nginx.conf", "/etc/nginx/conf.d/default.conf"]

