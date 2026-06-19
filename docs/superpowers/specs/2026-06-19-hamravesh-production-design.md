# NovaField Hamravesh Production Design

Date: 2026-06-19

## Objective

Refactor NovaField into a production-safe application and deploy it on Hamravesh for an initial five-day, pay-as-you-go evaluation. The deployment must be easy to repeat, inspect, roll back, and scale without adopting a dedicated Kubernetes cluster.

## Current Problems

- The Go API persists application data in one local JSON file.
- Authentication tokens, favorites, realtime connections, and world state rely on process memory.
- Uploaded files are written to the container filesystem.
- The backend cannot safely run multiple replicas or survive rolling replacement.
- The HTTP server has no graceful shutdown or separate readiness check.
- Frontend production builds fail because Phaser 4 no longer provides the default export used throughout the code.
- Backend tests perform production-cost bcrypt hashing hundreds of times and exceed practical CI duration.
- Existing workflows contain provider assumptions, duplicated validation, ineffective image scanning, unsafe mutable deployment tags, and unreliable rollback behavior.

## Selected Approach

Use Hamravesh Darkube rather than dedicated managed Kubernetes.

Darkube provides the required Kubernetes deployment behavior while avoiding cluster administration and its fixed management cost. The first deployment is intentionally small and disposable after approximately five days.

### Purchased Resources

- One Darkube namespace.
- One backend application.
- One frontend application.
- One standalone PostgreSQL 17 database with the smallest practical CPU/RAM plan and 5 GB storage.
- One object-storage bucket for production uploads.
- The existing Hamravesh container registry.

The following products are deferred:

- Dedicated managed Kubernetes
- High-availability database standby
- Dedicated load balancer
- Paid Sentry plan
- Paid general monitoring plan
- Enterprise support

Resources must use pay-as-you-go billing. They will not be configured as a prepaid monthly commitment.

## Target Architecture

### Frontend

Next.js 16 runs as a standalone container. Browser-visible API and WebSocket URLs are supplied at build time. Runtime-only server configuration remains in normal environment variables.

The frontend has:

- one production image identified by immutable Git commit SHA;
- a lightweight HTTP health check;
- no writable persistent filesystem;
- a non-root runtime user;
- explicit security headers and production-safe image configuration.

### Backend

The Go API is reorganized around explicit boundaries:

- `cmd/api`: process startup and shutdown;
- `internal/config`: validated environment configuration;
- `internal/http`: routes and middleware;
- `internal/service`: application use cases;
- `internal/repository`: persistence interfaces;
- `internal/postgres`: PostgreSQL implementations;
- `internal/blob`: S3-compatible object storage;
- `internal/realtime`: WebSocket connection management;
- `internal/observability`: structured logging and request metadata.

This remains a modular monolith. Splitting it into microservices would add deployment and consistency costs without solving a current product requirement.

### Database

PostgreSQL becomes the authoritative store for durable state. Schema changes are versioned SQL migrations.

The production database starts empty except for idempotent reference-data seeds. Existing JSON development data is not migrated because it contains demonstration data rather than required production records.

Authentication uses persistent, hashed session tokens with expiry and revocation. In-memory maps are removed from authentication and favorites.

### Uploads

The upload service writes original and transformed files to S3-compatible object storage. File metadata is stored in PostgreSQL. Containers do not serve or retain user files locally.

If object storage provisioning fails, deployment is blocked until the bucket is available. Uploads are never silently stored on ephemeral disk.

### Realtime State

WebSocket connections remain process-local for the first deployment and the backend runs with one replica. Durable messages and user-visible state are stored in PostgreSQL.

Before increasing the backend beyond one replica, cross-instance broadcast and presence must move to Redis or PostgreSQL pub/sub. The initial design does not buy Redis because one replica satisfies the evaluation requirement.

## Deployment Flow

### Pull Requests

GitHub Actions runs:

- Go formatting, vet, unit tests, race-sensitive tests where practical, and coverage;
- TypeScript type checking, linting, and Next.js production build;
- dependency review and secret scanning;
- Dockerfile and filesystem vulnerability scanning;
- container builds without registry push.

No deployment occurs from pull requests.

### Main Branch

After all checks pass:

1. Build frontend and backend images once.
2. Tag both images with the full Git commit SHA.
3. Generate an SBOM.
4. Scan the final images and fail on fixable critical vulnerabilities.
5. Push immutable images to the Hamravesh registry.
6. Run database migrations as a one-off, restart-safe operation.
7. Deploy the backend.
8. Wait for readiness and run API smoke tests.
9. Deploy the frontend.
10. Run public end-to-end smoke tests.
11. Record the deployed image digests and Git SHA.

Mutable `latest` tags are not deployment identities.

### Production Approval

During the initial five-day evaluation, pushes to `main` may deploy automatically after all gates pass. After the evaluation, the production GitHub environment will require manual approval.

### Rollback

Rollback is a separate manual workflow. It accepts a previously successful Git SHA, resolves it to immutable image digests, deploys those exact images, and runs health checks.

Database migrations follow expand-and-contract rules. A release must remain compatible with the previous application version so application rollback does not require destructive schema rollback.

## Health and Failure Handling

The backend exposes:

- `/health/live`: process is running;
- `/health/ready`: configuration is valid and PostgreSQL is reachable;
- `/health/startup`: initialization and migrations are complete.

The process handles termination signals, stops accepting traffic, drains active HTTP requests, closes WebSockets, and exits within the Darkube termination grace period.

Deployments use rolling update with:

- readiness, liveness, and startup probes;
- explicit CPU and memory requests/limits;
- `maxUnavailable: 0`;
- `maxSurge: 1`;
- a pre-stop delay to allow endpoint removal.

Failed health checks stop promotion. They do not retag a failed image or overwrite the last-known-good release.

## Testing Strategy

### Backend

- Replace direct global database access with injected interfaces.
- Use repository unit tests and PostgreSQL integration tests.
- Use a lower bcrypt cost only in tests through an injected password hasher.
- Stop package `init` functions from launching immortal background goroutines.
- Test shutdown, readiness, migration idempotency, session persistence, and upload failure behavior.

### Frontend

- Correct Phaser 4 imports and establish one supported import pattern.
- Add type checking, linting, production build, and focused component tests.
- Add a browser smoke test for landing page, registration/login, marketplace navigation, and WebSocket connection.

### Deployment

- Validate Docker images locally and in CI.
- Run smoke tests against the deployed URLs.
- Verify that a failed release leaves the previous release serving traffic.
- Exercise the manual rollback workflow once during the evaluation.

## Security

- Rotate any provider key that may have been committed to repository documentation.
- Keep database, registry, object-storage, and deployment credentials only in GitHub environment secrets and Hamravesh secrets.
- Use least-privilege database and object-storage credentials.
- Do not print secrets in workflows.
- Run containers as non-root with a read-only root filesystem where compatible.
- Restrict CORS to explicit production and staging origins.
- Add request-size limits, timeouts, security headers, and structured audit fields.

## Execution Phases

1. Repair the reproducible frontend build and backend test-time problems.
2. Introduce configuration, server lifecycle, health checks, and modular boundaries.
3. Implement PostgreSQL schema, repositories, sessions, and seeds.
4. Implement S3-compatible uploads.
5. Replace the old CI/CD workflows.
6. Provision the minimal Hamravesh resources.
7. Configure GitHub and Hamravesh secrets.
8. Deploy, smoke test, verify rollback, and document operations.
9. On 2026-06-24, delete or scale down paid resources unless the user asks to retain them.

## Acceptance Criteria

- All backend and frontend checks pass from a clean checkout.
- No durable production data depends on container memory or local disk.
- Images are built once and deployed by immutable SHA/digest.
- A push to `main` can complete deployment without manual server commands.
- Readiness prevents traffic from reaching an unready backend.
- The deployed application passes public smoke tests.
- A prior successful release can be restored through the rollback workflow.
- Purchased resources are limited to the approved pay-as-you-go evaluation scope.
