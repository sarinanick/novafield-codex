FROM golang:1.25-alpine@sha256:523c3effe300580ed375e43f43b1c9b091b68e935a7c3a92bfcc4e7ed55b18c2 AS builder
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o /out/novafield-api ./cmd/api

FROM alpine:3.22@sha256:310c62b5e7ca5b08167e4384c68db0fd2905dd9c7493756d356e893909057601
RUN apk --no-cache add ca-certificates tzdata
WORKDIR /app
COPY --from=builder --chown=10001:10001 /out/novafield-api /app/novafield-api
USER 10001:10001
ENV APP_ENV=production
EXPOSE 3001
ENTRYPOINT ["/app/novafield-api"]
