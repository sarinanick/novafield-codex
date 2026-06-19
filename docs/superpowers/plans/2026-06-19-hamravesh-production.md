# NovaField Hamravesh Production Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make NovaField production-safe, provision five-day pay-as-you-go Hamravesh resources, and deploy repeatable frontend and backend releases through GitHub Actions.

**Architecture:** Keep NovaField as a modular monolith. Persist application state, sessions, favorites, and file metadata in PostgreSQL; store uploads in S3-compatible object storage; run one backend replica for process-local WebSockets; deploy immutable images to Darkube through namespace-scoped Kubernetes credentials.

**Tech Stack:** Go 1.25, PostgreSQL 17, pgx v5, Next.js 16, React 19, Phaser 4, Docker BuildKit, GitHub Actions, Trivy, Syft, Kubernetes/Darkube, S3-compatible object storage.

---

## File Map

### Frontend

- Modify `frontend/package.json`: deterministic validation scripts and test tooling.
- Modify `frontend/package-lock.json`: locked dependencies.
- Modify `frontend/src/lib/phaser/**/*.ts`: Phaser 4 namespace imports.
- Modify `frontend/next.config.js`: security headers and production image policy.
- Modify `frontend/Dockerfile`: pinned non-root standalone image and health behavior.
- Create `frontend/src/app/api/health/route.ts`: frontend health endpoint.
- Create `frontend/src/lib/env.ts`: validated public runtime/build configuration.
- Create `frontend/src/lib/env.test.ts`: environment validation tests.

### Backend

- Create `backend/cmd/api/main.go`: application composition and process lifecycle.
- Create `backend/internal/config/config.go`: validated environment configuration.
- Create `backend/internal/config/config_test.go`: configuration tests.
- Create `backend/internal/platform/server/server.go`: HTTP server timeouts and graceful shutdown.
- Create `backend/internal/platform/server/server_test.go`: shutdown and timeout tests.
- Create `backend/internal/platform/postgres/postgres.go`: pgx pool creation and readiness.
- Create `backend/internal/platform/migrate/migrate.go`: embedded, transactional migrations.
- Create `backend/internal/platform/migrate/migrations/*.sql`: PostgreSQL schema.
- Create `backend/internal/state/repository.go`: application-state persistence contract.
- Create `backend/internal/state/postgres.go`: PostgreSQL JSONB state repository with row locking.
- Create `backend/internal/state/postgres_test.go`: integration tests.
- Create `backend/internal/auth/session_repository.go`: persistent session contract.
- Create `backend/internal/auth/postgres_sessions.go`: hashed session persistence.
- Create `backend/internal/auth/password.go`: production and test bcrypt costs.
- Create `backend/internal/blob/store.go`: object-storage contract.
- Create `backend/internal/blob/s3.go`: S3-compatible upload implementation.
- Create `backend/internal/blob/memory.go`: deterministic test implementation.
- Create `backend/internal/health/handler.go`: live, ready, startup endpoints.
- Modify `backend/database/database.go`: compatibility adapter backed by the state repository.
- Modify `backend/store/store.go`: remove token/favorite globals and use repositories.
- Modify `backend/handlers/upload.go`: inject blob storage and persist metadata.
- Modify `backend/handlers/coworking.go`: replace package `init` goroutine with lifecycle-managed worker.
- Modify `backend/main.go`: reduce to compatibility routing or remove after route extraction.
- Modify `backend/Dockerfile`: production build, non-root runtime, read-only compatibility.
- Modify backend tests: inject cheap password hashing and isolated repositories.

### Deployment and CI/CD

- Create `deploy/k8s/base/namespace.yaml`: namespace metadata documentation.
- Create `deploy/k8s/base/backend.yaml`: Deployment, Service, probes, resources, security context.
- Create `deploy/k8s/base/frontend.yaml`: Deployment, Service, probes, resources, security context.
- Create `deploy/k8s/base/ingress.yaml`: frontend/API routing and TLS hosts.
- Create `deploy/k8s/base/kustomization.yaml`: base resources.
- Create `deploy/k8s/production/kustomization.yaml`: production images and patches.
- Create `deploy/scripts/smoke.ps1`: public health and authentication smoke tests.
- Create `.github/workflows/ci.yml`: pull-request and branch validation.
- Create `.github/workflows/release.yml`: immutable build, scan, push, migrate, deploy, verify.
- Create `.github/workflows/rollback.yml`: digest/SHA rollback.
- Delete `.github/workflows/deploy.yml`: obsolete Darakub API workflow.
- Delete obsolete `.github/actions/darakub-*`: provider-specific actions.
- Modify `.env.example`: complete production configuration contract.
- Rewrite `DEPLOY.md`: operational runbook without credentials.

## Phase 1 — Stabilize Builds and Tests

### Task 1: Repair the Frontend Dependency and Phaser Build

**Files:**

- Modify: `frontend/package.json`
- Modify: `frontend/package-lock.json`
- Modify: all files under `frontend/src/lib/phaser/` that contain `import Phaser from "phaser"`

- [ ] **Step 1: Write a source-contract test**

Create `frontend/scripts/check-phaser-imports.mjs`:

```js
import { glob } from "node:fs/promises";
import { readFile } from "node:fs/promises";

const invalid = [];
for await (const file of glob("src/lib/phaser/**/*.ts")) {
  const source = await readFile(file, "utf8");
  if (source.includes('import Phaser from "phaser"')) invalid.push(file);
}
if (invalid.length) {
  console.error(`Invalid Phaser default imports:\n${invalid.join("\n")}`);
  process.exit(1);
}
```

- [ ] **Step 2: Add deterministic scripts**

Add these scripts to `frontend/package.json`:

```json
{
  "lint": "eslint . --max-warnings=0",
  "typecheck": "tsc --noEmit",
  "test:imports": "node scripts/check-phaser-imports.mjs",
  "check": "npm run test:imports && npm run typecheck && npm run lint && npm run build"
}
```

- [ ] **Step 3: Verify the import test fails**

Run:

```powershell
npm install
npm run test:imports
```

Expected: failure listing the eleven Phaser files.

- [ ] **Step 4: Replace all Phaser imports**

Use this form consistently:

```ts
import * as Phaser from "phaser";
```

- [ ] **Step 5: Verify a clean production build**

Run:

```powershell
npm ci
npm run check
```

Expected: all checks pass and `.next/standalone/server.js` exists.

- [ ] **Step 6: Commit**

```powershell
git add frontend
git commit -m "fix(frontend): restore deterministic Phaser production build"
```

### Task 2: Remove Backend Test-Time Global Work and Expensive Hashing

**Files:**

- Create: `backend/internal/auth/password.go`
- Create: `backend/internal/auth/password_test.go`
- Modify: `backend/store/store.go`
- Modify: `backend/handlers/handlers_test.go`
- Modify: `backend/handlers/coworking.go`

- [ ] **Step 1: Write password-hasher tests**

```go
func TestBcryptHasherRoundTrip(t *testing.T) {
    h := NewBcryptHasher(bcrypt.MinCost)
    encoded, err := h.Hash("password123")
    if err != nil { t.Fatal(err) }
    if !h.Compare(encoded, "password123") { t.Fatal("password did not match") }
    if h.Compare(encoded, "wrong") { t.Fatal("wrong password matched") }
}
```

- [ ] **Step 2: Run the focused test and confirm failure**

Run:

```powershell
go test ./internal/auth -run TestBcryptHasherRoundTrip -count=1
```

Expected: package or constructor does not exist.

- [ ] **Step 3: Implement the injected hasher**

```go
type PasswordHasher interface {
    Hash(password string) (string, error)
    Compare(encoded, password string) bool
}

type BcryptHasher struct{ cost int }

func NewBcryptHasher(cost int) BcryptHasher { return BcryptHasher{cost: cost} }
func (h BcryptHasher) Hash(password string) (string, error) {
    value, err := bcrypt.GenerateFromPassword([]byte(password), h.cost)
    return string(value), err
}
func (h BcryptHasher) Compare(encoded, password string) bool {
    return bcrypt.CompareHashAndPassword([]byte(encoded), []byte(password)) == nil
}
```

- [ ] **Step 4: Make tests use `bcrypt.MinCost`**

Replace direct `store.HashPassword` use in test helpers with an injected test hasher. Production wiring continues to use `bcrypt.DefaultCost`.

- [ ] **Step 5: Replace `coworking.go` package initialization**

Expose:

```go
func StartCoworkingMaintenance(ctx context.Context, interval time.Duration) {
    ticker := time.NewTicker(interval)
    defer ticker.Stop()
    for {
        select {
        case <-ctx.Done():
            return
        case <-ticker.C:
            SyncCoworkingTimers()
            ExpireStaleCoworkingSessions()
        }
    }
}
```

Delete the package `init()` goroutine.

- [ ] **Step 6: Verify the complete backend suite**

Run:

```powershell
go test ./... -count=1 -timeout 60s
go test -race ./handlers -count=1 -timeout 120s
```

Expected: both commands pass; normal tests finish in under 30 seconds.

- [ ] **Step 7: Commit**

```powershell
git add backend
git commit -m "test(backend): isolate hashing and background workers"
```

## Phase 2 — Production-Safe Backend

### Task 3: Add Validated Configuration

**Files:**

- Create: `backend/internal/config/config.go`
- Create: `backend/internal/config/config_test.go`
- Modify: `.env.example`

- [ ] **Step 1: Write table-driven configuration tests**

Test that production configuration rejects missing `DATABASE_URL`, `SESSION_SECRET`, `CORS_ORIGINS`, `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY`, and `S3_SECRET_KEY`.

```go
func TestLoadProductionRequiresDatabase(t *testing.T) {
    env := validEnv()
    delete(env, "DATABASE_URL")
    _, err := Load(MapLookup(env))
    if !errors.Is(err, ErrDatabaseURLRequired) { t.Fatalf("got %v", err) }
}
```

- [ ] **Step 2: Run tests and confirm failure**

```powershell
go test ./internal/config -count=1
```

Expected: package does not exist.

- [ ] **Step 3: Implement typed configuration**

Define:

```go
type Config struct {
    Environment string
    Port string
    DatabaseURL string
    SessionSecret string
    CORSOrigins []string
    ShutdownTimeout time.Duration
    S3 S3Config
}
```

`Load` must trim values, parse durations, reject wildcard CORS in production, and return typed sentinel errors.

- [ ] **Step 4: Document every variable**

Update `.env.example` with non-secret examples and no provider credentials.

- [ ] **Step 5: Verify**

```powershell
go test ./internal/config -count=1
```

Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add backend/internal/config .env.example
git commit -m "feat(backend): add validated production configuration"
```

### Task 4: Add PostgreSQL, Migrations, and Durable State

**Files:**

- Modify: `backend/go.mod`
- Modify: `backend/go.sum`
- Create: `backend/internal/platform/postgres/postgres.go`
- Create: `backend/internal/platform/migrate/migrate.go`
- Create: `backend/internal/platform/migrate/migrations/0001_core.sql`
- Create: `backend/internal/state/repository.go`
- Create: `backend/internal/state/postgres.go`
- Create: `backend/internal/state/postgres_test.go`
- Modify: `backend/database/database.go`

- [ ] **Step 1: Add pgx**

```powershell
go get github.com/jackc/pgx/v5/pgxpool
```

- [ ] **Step 2: Write integration tests**

The test uses `TEST_DATABASE_URL` and skips only when it is absent:

```go
func TestPostgresRepositoryUpdateIsAtomic(t *testing.T) {
    repo := newTestRepository(t)
    ctx := context.Background()
    if err := repo.Update(ctx, func(s *models.DB) error {
        s.Users = append(s.Users, models.User{ID: "u1", Email: "one@example.com"})
        return nil
    }); err != nil { t.Fatal(err) }
    loaded, err := repo.Load(ctx)
    if err != nil { t.Fatal(err) }
    if len(loaded.Users) != 1 { t.Fatalf("users=%d", len(loaded.Users)) }
}
```

- [ ] **Step 3: Create the initial schema**

`0001_core.sql` creates:

```sql
CREATE TABLE schema_migrations (
  version bigint PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE application_state (
  id smallint PRIMARY KEY CHECK (id = 1),
  revision bigint NOT NULL DEFAULT 0,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO application_state (id, payload) VALUES (1, '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE sessions (
  token_hash bytea PRIMARY KEY,
  user_id text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX sessions_user_id_idx ON sessions(user_id);
CREATE INDEX sessions_expires_at_idx ON sessions(expires_at);

CREATE TABLE favorites (
  user_id text NOT NULL,
  gig_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, gig_id)
);

CREATE TABLE uploaded_objects (
  id text PRIMARY KEY,
  owner_user_id text NOT NULL,
  object_key text NOT NULL UNIQUE,
  content_type text NOT NULL,
  size_bytes bigint NOT NULL CHECK (size_bytes >= 0),
  created_at timestamptz NOT NULL DEFAULT now()
);
```

- [ ] **Step 4: Implement transaction-safe state updates**

`Update` begins a transaction, selects row `id=1 FOR UPDATE`, decodes JSON, invokes the callback, increments `revision`, writes JSON, and commits. The compatibility database adapter delegates mutations to this repository.

- [ ] **Step 5: Run integration tests**

```powershell
docker compose up -d postgres
$env:TEST_DATABASE_URL='postgres://novafield:novafield@localhost:5432/novafield?sslmode=disable'
go test ./internal/state ./internal/platform/migrate -count=1
```

Expected: PASS and migration re-run is idempotent.

- [ ] **Step 6: Commit**

```powershell
git add backend docker-compose.yml
git commit -m "feat(backend): persist application state in PostgreSQL"
```

### Task 5: Persist Sessions and Favorites

**Files:**

- Create: `backend/internal/auth/session_repository.go`
- Create: `backend/internal/auth/postgres_sessions.go`
- Create: `backend/internal/auth/postgres_sessions_test.go`
- Create: `backend/internal/favorites/repository.go`
- Create: `backend/internal/favorites/postgres.go`
- Modify: `backend/store/store.go`
- Modify: `backend/handlers/auth.go`
- Modify: `backend/handlers/dashboard.go`
- Modify: `backend/handlers/helpers.go`
- Modify: `backend/handlers/world.go`
- Modify: `backend/handlers/realtime.go`
- Modify: `backend/main.go`
- Modify: `backend/models/models.go`
- Modify: `backend/handlers/handlers_test.go`
- Modify: `backend/handlers/matching_test.go`
- Modify: `backend/handlers/organizations_test.go`
- Modify: `backend/handlers/middleware_test.go`

- [ ] **Step 1: Write session persistence tests**

Cover creation, SHA-256 token hashing, lookup, expiry, revocation, and the guarantee that plaintext tokens never appear in the database.

- [ ] **Step 2: Run tests and confirm failure**

```powershell
go test ./internal/auth -run PostgresSession -count=1
```

- [ ] **Step 3: Implement repositories**

Session creation returns a cryptographically random plaintext token once and stores only:

```go
sum := sha256.Sum256([]byte(token))
```

Favorites use `INSERT ... ON CONFLICT DO NOTHING` and `DELETE`.

- [ ] **Step 4: Replace global maps**

Delete `store.DB.Tokens`, `store.DB.Favorites`, and their locks. Route authentication and favorite handlers through injected repository interfaces.

- [ ] **Step 5: Verify**

```powershell
go test ./... -count=1 -timeout 60s
```

Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add backend
git commit -m "feat(backend): persist sessions and favorites"
```

### Task 6: Move Uploads to Object Storage

**Files:**

- Create: `backend/internal/blob/store.go`
- Create: `backend/internal/blob/memory.go`
- Create: `backend/internal/blob/s3.go`
- Create: `backend/internal/blob/s3_test.go`
- Modify: `backend/handlers/upload.go`
- Modify: `backend/handlers/upload_test.go`
- Modify: `backend/go.mod`
- Modify: `backend/go.sum`

- [ ] **Step 1: Add the S3 client**

```powershell
go get github.com/minio/minio-go/v7
```

- [ ] **Step 2: Rewrite upload tests against `blob.MemoryStore`**

Assert allowed MIME type, size limit, generated object key, resized image, thumbnail, metadata row, and cleanup after partial failure.

- [ ] **Step 3: Implement the interface**

```go
type Store interface {
    Put(ctx context.Context, key, contentType string, body io.Reader, size int64) error
    Delete(ctx context.Context, key string) error
    PublicURL(key string) string
}
```

- [ ] **Step 4: Implement S3 storage**

Configure endpoint, access key, secret key, TLS, bucket, and public base URL from `config.S3`. Do not create buckets from application startup.

- [ ] **Step 5: Remove local file serving**

Delete the `/uploads/` filesystem route and all runtime `os.WriteFile`/`os.MkdirAll` upload paths.

- [ ] **Step 6: Verify**

```powershell
go test ./handlers ./internal/blob -count=1
rg -n 'os\.WriteFile|http\.FileServer|/uploads/' backend --glob '!**/*_test.go'
```

Expected: tests pass; the search returns no local upload implementation.

- [ ] **Step 7: Commit**

```powershell
git add backend
git commit -m "feat(backend): store uploads in S3-compatible storage"
```

### Task 7: Add Server Lifecycle and Kubernetes Health

**Files:**

- Create: `backend/internal/health/handler.go`
- Create: `backend/internal/health/handler_test.go`
- Create: `backend/internal/platform/server/server.go`
- Create: `backend/internal/platform/server/server_test.go`
- Create: `backend/cmd/api/main.go`
- Modify: `backend/main.go`

- [ ] **Step 1: Write health tests**

Live always returns 200 after startup. Ready returns 503 when PostgreSQL ping fails and 200 when it succeeds. Startup returns 503 until migrations finish.

- [ ] **Step 2: Write graceful-shutdown test**

Start a slow handler, cancel the application context, and assert the in-flight request completes before shutdown returns.

- [ ] **Step 3: Implement the server**

Use:

```go
&http.Server{
    Addr:              ":" + cfg.Port,
    Handler:           handler,
    ReadHeaderTimeout: 5 * time.Second,
    ReadTimeout:       15 * time.Second,
    WriteTimeout:      30 * time.Second,
    IdleTimeout:       60 * time.Second,
}
```

Handle `SIGINT` and `SIGTERM` with `signal.NotifyContext`.

- [ ] **Step 4: Wire application dependencies**

Startup order is configuration, logger, PostgreSQL, migrations, state repository, session repository, blob storage, router, maintenance worker, HTTP server.

- [ ] **Step 5: Verify**

```powershell
go test ./... -count=1 -timeout 60s
go build ./cmd/api
```

Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add backend
git commit -m "feat(backend): add graceful lifecycle and health probes"
```

## Phase 3 — Images, Kubernetes, and CI/CD

### Task 8: Harden Container Images

**Files:**

- Modify: `backend/Dockerfile`
- Modify: `frontend/Dockerfile`
- Modify: `.dockerignore` or create service-specific `.dockerignore` files.

- [ ] **Step 1: Add image smoke checks**

Create `deploy/scripts/image-smoke.ps1` that builds both images, starts them with required test configuration, waits for health endpoints, and stops containers in `finally`.

- [ ] **Step 2: Harden backend image**

Build `./cmd/api`, pin Alpine by digest during implementation, run as numeric non-root UID, and write only to `/tmp`.

- [ ] **Step 3: Harden frontend image**

Copy standalone output, expose `/api/health`, run as numeric non-root UID, and set `NEXT_TELEMETRY_DISABLED=1`.

- [ ] **Step 4: Verify**

```powershell
./deploy/scripts/image-smoke.ps1
```

Expected: both health endpoints return 200.

- [ ] **Step 5: Commit**

```powershell
git add backend/Dockerfile frontend/Dockerfile deploy/scripts
git commit -m "build: harden production container images"
```

### Task 9: Add Kubernetes Manifests

**Files:**

- Create all files under `deploy/k8s/base/`
- Create: `deploy/k8s/production/kustomization.yaml`

- [ ] **Step 1: Write manifest policy tests**

Create `deploy/scripts/validate-manifests.ps1` that runs `kubectl kustomize`, verifies every Deployment has requests/limits, non-root security context, three probes, SHA-substitutable image references, and `maxUnavailable: 0`.

- [ ] **Step 2: Add backend Deployment**

Use one replica, port 3001, startup/live/ready probes, `preStop: sleep 5`, 30-second termination grace, 100m/128Mi requests, 500m/512Mi limits.

- [ ] **Step 3: Add frontend Deployment**

Use one replica, port 3000, `/api/health`, 50m/128Mi requests, 300m/512Mi limits.

- [ ] **Step 4: Add Services and Ingress**

Route `/api` and WebSocket paths to backend; route all other paths to frontend. TLS host values are production overlay substitutions.

- [ ] **Step 5: Verify**

```powershell
./deploy/scripts/validate-manifests.ps1
kubectl kustomize deploy/k8s/production | kubectl apply --dry-run=client -f -
```

Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add deploy/k8s deploy/scripts/validate-manifests.ps1
git commit -m "deploy: add Darkube Kubernetes manifests"
```

### Task 10: Replace CI

**Files:**

- Rewrite: `.github/workflows/ci.yml`
- Delete obsolete workflow actions after references are removed.

- [ ] **Step 1: Add workflow syntax validation**

Install and run `actionlint` locally or in a container against all workflows.

- [ ] **Step 2: Implement CI jobs**

Jobs:

1. backend format/vet/test;
2. backend PostgreSQL integration test with a PostgreSQL 17 service;
3. frontend `npm ci` and `npm run check`;
4. secret scan with Gitleaks;
5. filesystem/config scan using a pinned Trivy action version;
6. Docker build verification.

Security failures must not use `continue-on-error`.

- [ ] **Step 3: Add concurrency and least permissions**

Use:

```yaml
permissions:
  contents: read

concurrency:
  group: ci-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

- [ ] **Step 4: Verify**

```powershell
actionlint .github/workflows/*.yml
```

Expected: no findings.

- [ ] **Step 5: Commit**

```powershell
git add .github
git commit -m "ci: replace checks with blocking production gates"
```

### Task 11: Add Release and Rollback Workflows

**Files:**

- Create: `.github/workflows/release.yml`
- Create: `.github/workflows/rollback.yml`
- Delete: `.github/workflows/deploy.yml`

- [ ] **Step 1: Implement immutable release build**

Login to `registry.hamdocker.ir`, build both images with Buildx, push `${GITHUB_SHA}`, capture digests, generate SPDX SBOMs with Syft, and scan digests with Trivy.

- [ ] **Step 2: Implement migration and deploy**

Decode `KUBECONFIG_B64` to `$RUNNER_TEMP/kubeconfig`, create/update Kubernetes secrets without printing values, run a migration Job using the backend image, apply Kustomize resources, and set images by digest.

- [ ] **Step 3: Implement rollout and smoke verification**

Run:

```bash
kubectl rollout status deployment/novafield-backend --timeout=180s
kubectl rollout status deployment/novafield-frontend --timeout=180s
pwsh ./deploy/scripts/smoke.ps1
```

- [ ] **Step 4: Implement rollback**

`workflow_dispatch` requires a full 40-character Git SHA. Verify both registry manifests exist, deploy those immutable tags, wait for rollout, and run smoke tests. It must not invoke normal release jobs.

- [ ] **Step 5: Verify**

```powershell
actionlint .github/workflows/*.yml
```

Expected: no findings.

- [ ] **Step 6: Commit**

```powershell
git add .github deploy/scripts/smoke.ps1
git commit -m "ci: add immutable Darkube release and rollback"
```

## Phase 4 — Hamravesh Provisioning and Deployment

### Task 12: Provision Minimal Five-Day Resources

**External changes:** Hamravesh account `alitabaei7`.

- [ ] **Step 1: Create a namespace**

Create `alitabaei7-novafield-prod` on the selected public cluster. Record the cluster and namespace in `DEPLOY.md`.

- [ ] **Step 2: Download namespace kubeconfig**

Store it only in a temporary local path, verify namespace scope with:

```powershell
$kubeconfigPath = Join-Path $env:TEMP 'novafield-hamravesh-kubeconfig.yaml'
kubectl --kubeconfig $kubeconfigPath auth can-i --list
kubectl --kubeconfig $kubeconfigPath get namespace
```

Delete the local file after saving its base64 content as GitHub environment secret `KUBECONFIG_B64`.

- [ ] **Step 3: Create PostgreSQL**

Create PostgreSQL 17, standalone/normal, 1 vCPU, 2 GB RAM, 5 GB disk. Do not enable standby/HA. Save the connection URL only in Hamravesh/Kubernetes and GitHub production secrets.

- [ ] **Step 4: Create object storage**

Create the minimum available bucket and traffic plan. Generate least-privilege access credentials for the NovaField bucket.

- [ ] **Step 5: Verify registry**

Use the existing `registry.hamdocker.ir` registry. Generate or retrieve a deploy credential and store it as `REGISTRY_USERNAME` and `REGISTRY_PASSWORD`.

- [ ] **Step 6: Record exact cost state**

Document resource sizes, creation timestamp, initial balance, and planned cleanup date `2026-06-24` without recording credentials.

### Task 13: Configure GitHub Environments and Secrets

**External changes:** GitHub repository `sarinanick/novafield-codex`.

- [ ] **Step 1: Create `production` environment**

Add deployment URL after DNS/host creation.

- [ ] **Step 2: Add secrets**

Create:

- `KUBECONFIG_B64`
- `REGISTRY_USERNAME`
- `REGISTRY_PASSWORD`
- `DATABASE_URL`
- `SESSION_SECRET`
- `S3_ENDPOINT`
- `S3_ACCESS_KEY`
- `S3_SECRET_KEY`
- `S3_BUCKET`
- `S3_PUBLIC_BASE_URL`

Create variables:

- `PRODUCTION_HOST`
- `PRODUCTION_API_URL`
- `PRODUCTION_WS_URL`
- `CORS_ORIGINS`
- `KUBE_NAMESPACE`

- [ ] **Step 3: Verify names without reading secret values**

```powershell
gh secret list --env production
gh variable list --env production
```

Expected: every required name appears once.

### Task 14: Rotate Leaked Provider Material

**Files:**

- Rewrite: `DEPLOY.md`
- Inspect: Git history and GitHub secret scanning.

- [ ] **Step 1: Search tracked content**

```powershell
git grep -n -I -E '(api[_-]?key|token|password|secret).{0,40}[=:]'
```

- [ ] **Step 2: Remove credential-like documentation**

Replace concrete values with secret names and rotation instructions.

- [ ] **Step 3: Revoke provider credentials when identifiable**

Use the relevant Hamravesh/Darkube console to revoke any credential that was committed. Create a replacement only for the new CI/CD path.

- [ ] **Step 4: Verify**

Run Gitleaks against the working tree and Git history. Expected: no active credential findings.

- [ ] **Step 5: Commit**

```powershell
git add DEPLOY.md
git commit -m "docs: replace legacy deployment guide and rotate secrets"
```

### Task 15: Push, Review, and Deploy

- [ ] **Step 1: Run the complete local gate**

```powershell
go test ./... -count=1 -timeout 60s
npm ci --prefix frontend
npm run check --prefix frontend
./deploy/scripts/validate-manifests.ps1
actionlint .github/workflows/*.yml
```

Expected: all commands pass.

- [ ] **Step 2: Push the implementation branch**

```powershell
git push -u origin codex/hamravesh-production
```

- [ ] **Step 3: Open a ready pull request**

The PR must describe architecture, purchased resources, migration behavior, security changes, test evidence, deployment sequence, rollback, and cleanup date.

- [ ] **Step 4: Wait for CI and address failures**

Inspect the exact failing logs. Apply one root-cause fix at a time with a regression test.

- [ ] **Step 5: Merge to `main`**

Merge only after all required checks pass.

- [ ] **Step 6: Observe release**

Verify image digests, migration Job completion, both rollouts, public health checks, login flow, upload flow, and WebSocket connection.

- [ ] **Step 7: Exercise rollback**

Run the rollback workflow to the same known-good SHA or an earlier successful SHA, verify service health, then redeploy the intended current SHA.

- [ ] **Step 8: Publish operational handoff**

Update `DEPLOY.md` with URLs, resource inventory, common commands, rollback procedure, and cleanup instructions.

### Task 16: Five-Day Cleanup Control

**Files:**

- Create: `.github/workflows/evaluation-expiry.yml`
- Modify: `DEPLOY.md`

- [ ] **Step 1: Add a non-destructive expiry reminder**

Create a scheduled/manual workflow that opens a GitHub issue on `2026-06-24` requesting deletion or retention approval. It must not delete paid resources automatically.

- [ ] **Step 2: Document cleanup order**

Order: disable release workflow, preserve needed database/export data, delete frontend/backend workloads, delete object storage objects/bucket, delete PostgreSQL, delete namespace, remove obsolete secrets.

- [ ] **Step 3: Verify workflow syntax**

```powershell
actionlint .github/workflows/evaluation-expiry.yml
```

- [ ] **Step 4: Commit**

```powershell
git add .github/workflows/evaluation-expiry.yml DEPLOY.md
git commit -m "ops: add five-day evaluation cleanup control"
```

## Final Verification

- [ ] `git status --short` is clean.
- [ ] Backend tests pass from a clean checkout.
- [ ] Frontend checks and production build pass from a clean checkout.
- [ ] PostgreSQL migrations are idempotent.
- [ ] No runtime durable state depends on local disk or process memory.
- [ ] GitHub CI blocks failures.
- [ ] Release uses immutable SHA tags and recorded digests.
- [ ] Darkube probes and rollout complete.
- [ ] Public smoke tests, upload, authentication, and WebSockets pass.
- [ ] Rollback is successfully exercised.
- [ ] Resource inventory and `2026-06-24` cleanup instructions are documented.
