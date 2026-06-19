package auth

import (
	"context"
	"errors"
	"os"
	"testing"
	"time"

	"novafield-api/internal/platform/migrate"

	"github.com/jackc/pgx/v5/pgxpool"
)

func TestPostgresSessionLifecycleAndTokenSecrecy(t *testing.T) {
	databaseURL := os.Getenv("TEST_DATABASE_URL")
	if databaseURL == "" {
		t.Skip("TEST_DATABASE_URL is not set")
	}
	ctx := context.Background()
	pool, err := pgxpool.New(ctx, databaseURL)
	if err != nil {
		t.Fatal(err)
	}
	defer pool.Close()
	if err := migrate.Apply(ctx, pool); err != nil {
		t.Fatal(err)
	}
	if _, err := pool.Exec(ctx, "TRUNCATE sessions"); err != nil {
		t.Fatal(err)
	}

	repo := NewPostgresSessionRepository(pool)
	token, err := repo.Create(ctx, "user-1", time.Now().Add(time.Hour))
	if err != nil {
		t.Fatal(err)
	}
	if token == "" {
		t.Fatal("expected plaintext token")
	}

	var plaintextRows int
	if err := pool.QueryRow(ctx,
		"SELECT count(*) FROM sessions WHERE encode(token_hash, 'hex')=$1", token,
	).Scan(&plaintextRows); err != nil {
		t.Fatal(err)
	}
	if plaintextRows != 0 {
		t.Fatal("plaintext session token was stored")
	}

	userID, err := repo.UserID(ctx, token)
	if err != nil || userID != "user-1" {
		t.Fatalf("resolve session: user=%q err=%v", userID, err)
	}
	if err := repo.Revoke(ctx, token); err != nil {
		t.Fatal(err)
	}
	if _, err := repo.UserID(ctx, token); !errors.Is(err, ErrSessionNotFound) {
		t.Fatalf("expected revoked session to be absent, got %v", err)
	}
}

func TestPostgresSessionExpiry(t *testing.T) {
	databaseURL := os.Getenv("TEST_DATABASE_URL")
	if databaseURL == "" {
		t.Skip("TEST_DATABASE_URL is not set")
	}
	ctx := context.Background()
	pool, err := pgxpool.New(ctx, databaseURL)
	if err != nil {
		t.Fatal(err)
	}
	defer pool.Close()
	if err := migrate.Apply(ctx, pool); err != nil {
		t.Fatal(err)
	}

	repo := NewPostgresSessionRepository(pool)
	token, err := repo.Create(ctx, "expired-user", time.Now().Add(-time.Minute))
	if err != nil {
		t.Fatal(err)
	}
	if _, err := repo.UserID(ctx, token); !errors.Is(err, ErrSessionNotFound) {
		t.Fatalf("expected expired session to be absent, got %v", err)
	}
}
