# NovaField on Hamravesh: CI/CD guide

This guide explains the deployment path chosen for NovaField on Hamravesh and why each choice exists. It is written for someone who wants to understand the pipeline, not just copy commands.

## What we are optimizing for

We want a deployment flow that is:

- repeatable;
- independent of manual console clicks;
- safe for a private GitHub repository;
- compatible with Hamravesh’s Docker-image deployment model;
- easy to debug when something fails.

That is why the current strategy is:

1. build container images in GitHub Actions;
2. publish the images to a registry;
3. create Hamravesh apps from those images;
4. wire the apps to managed PostgreSQL and object storage;
5. use health checks, resource limits, and clear environment variables.

## Decision summary

| Concern | Decision | Why |
|---|---|---|
| Source control | GitHub private repo | Keeps the code private and versioned |
| Build system | GitHub Actions | Automated on push, easy to audit |
| Deploy target | Hamravesh Docker image apps | Avoids GitHub App login friction |
| Backend state | Managed PostgreSQL | Durable and easier to scale than file storage |
| File uploads | Managed object storage | Avoids local-container disk loss |
| Health strategy | HTTP readiness endpoint | Simple and Kubernetes-native |
| Release safety | Tagged images + latest tag | Supports rollback and pinning |

## The 10 Hamravesh references that shape this setup

1. GitHub Actions CI/CD overview: [آشنایی با اجزای ورکفلوی github-actions](https://docs.hamravesh.com/darkube/ci-cd/github-actions/)
2. First-app walkthrough: [راهنمای شروع سریع](https://docs.hamravesh.com/darkube/first-app)
3. Docker image app creation: [داکر ایمیج](https://docs.hamravesh.com/darkube/create/docker-image/intro/)
4. Docker image general settings: [تنظیمات عمومی اپ داکری](https://docs.hamravesh.com/products/darkube/create/docker-image/settings/general/)
5. Docker image ports: [تنظیمات پورت‌ها](https://docs.hamravesh.com/darkube/create/docker-image/settings/ports/)
6. Environment variables: [متغیرهای محیطی](https://docs.hamravesh.com/darkube/create/docker-image/settings/environment/)
7. Domain and DNS: [تنظیمات آدرس دامنه و DNS](https://docs.hamravesh.com/darkube/create/git-repo/settings/domain-address/)
8. Custom config: [Custom Config](https://docs.hamravesh.com/darkube/manage/custom-config/)
9. Troubleshooting: [نحوه‌ی عیب‌یابی اپها](https://docs.hamravesh.com/darkube/manage/troubleshooting)
10. PostgreSQL: [PostgreSQL](https://docs.hamravesh.com/darkube/create/databases/postgresql/)
11. MinIO/object storage: [MinIO](https://docs.hamravesh.com/darkube/create/databases/minio)
12. kubectl access: [دسترسی kubectl](https://docs.hamravesh.com/darkube/general-features/kubectl/)
13. App alerts: [هشدارهای اپ](https://docs.hamravesh.com/darkube/manage/alerts/)
14. Resource insights: [نمودارهای مصرف منابع](https://docs.hamravesh.com/darkube/manage/insights/)
15. FAQ: [سوالات متداول](https://docs.hamravesh.com/darkube/faq/)

## Why image-based deployment is the right fit here

Hamravesh supports creating apps from a Docker image. That matters because:

- the repository can stay private;
- the platform does not need to traverse GitHub organization permissions during deployment;
- release artifacts become explicit images;
- rollback is just “deploy the previous image tag”.

The docs for Docker-image apps describe the fields we must set: app name, port, command, args, and readiness probe. Those map directly to the runtime behavior of the two NovaField services.

## How the pipeline works

### 1. GitHub Actions builds the images

The workflow builds backend and frontend images independently.

Why this matters:

- backend failures do not hide frontend failures;
- caching is per-service;
- releases are traceable by SHA;
- the build output is deterministic.

### 2. Images are tagged

Each image is published with:

- the commit SHA;
- a `latest` tag.

Why both tags matter:

- SHA tags are immutable and good for rollbacks;
- `latest` is convenient for “track main” deployments.

### 3. Hamravesh consumes the image

When you create an app from a Docker image, the platform only needs:

- the image reference;
- the service port;
- the readiness path;
- environment variables;
- resource limits;
- optional custom config.

### 4. Health checks gate readiness

The backend must answer a simple HTTP readiness endpoint. If it returns 200, Hamravesh can treat the app as ready.

Why this matters:

- the platform can decide whether to route traffic;
- deployments become observable;
- failures are caught early.

### 5. Managed services keep state out of the container

The backend should not rely on container-local storage for production data.

Instead:

- PostgreSQL stores relational state;
- object storage stores uploads;
- the container remains disposable.

That is the core production rule: containers are ephemeral, state belongs outside them.

## Practical mapping for NovaField

### Backend

- image: backend image
- port: `3001`
- readiness: `/api/v1/health`
- env:
  - database connection details
  - object storage credentials
  - frontend origin / CORS values

### Frontend

- image: frontend image
- port: `3000`
- readiness: `/`
- env:
  - `NEXT_PUBLIC_API_URL`
  - `NEXT_PUBLIC_WS_URL`

## What to watch during deployment

Use these signals in order:

1. build logs;
2. image push success;
3. Hamravesh app creation success;
4. readiness probe success;
5. runtime logs;
6. app alerts;
7. resource graphs.

This order matters because it narrows the fault domain quickly.

## Common failure modes

### Wrong port

If the app listens on a different port than the one configured in Hamravesh, the platform may mark it unhealthy.

### Missing env vars

Missing DB or storage variables usually show up as boot-time errors or API request failures.

### Bad readiness path

If readiness does not return HTTP 200, the service may deploy but never become “ready”.

### Container-local persistence

If uploads or state are stored only in the container filesystem, a restart can lose data.

### Overly clever CI/CD

Complex pipelines are harder to debug. Favor a small number of explicit stages:

- build;
- publish;
- deploy;
- verify.

## How I would explain the platform choice to another engineer

Hamravesh is being used as a Kubernetes-backed runtime, not as a place where we build deployment logic into the app itself. The app builds into containers in GitHub Actions, then the platform runs those images with explicit health checks and externalized state.

That is the clean boundary:

- GitHub Actions owns build/release artifacts;
- Hamravesh owns runtime scheduling and app lifecycle;
- PostgreSQL and object storage own persistence.

## Recommended release policy

- `main` is always deployable.
- Every merge produces a tagged image.
- Rollback uses the previous SHA tag, not a code revert.
- Manual changes in the console should be limited to configuration, not source truth.

## Final checklist

- GitHub Actions workflow present and green.
- Images published successfully.
- Hamravesh backend app created from image.
- Hamravesh frontend app created from image.
- Backend connected to PostgreSQL.
- Backend connected to object storage.
- Frontend points to backend public URL.
- Readiness probes pass.
- Rollback path tested.

