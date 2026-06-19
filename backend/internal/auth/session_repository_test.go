package auth

import (
	"context"
	"errors"
	"testing"
	"time"
)

func TestMemorySessionRepositoryLifecycle(t *testing.T) {
	now := time.Date(2026, 6, 19, 0, 0, 0, 0, time.UTC)
	repo := NewMemorySessionRepository(func() time.Time { return now })

	token, err := repo.Create(context.Background(), "user-1", now.Add(time.Hour))
	if err != nil {
		t.Fatal(err)
	}
	if token == "" || token == "user-1" {
		t.Fatalf("unsafe token %q", token)
	}
	userID, err := repo.UserID(context.Background(), token)
	if err != nil || userID != "user-1" {
		t.Fatalf("userID=%q err=%v", userID, err)
	}

	if err := repo.Revoke(context.Background(), token); err != nil {
		t.Fatal(err)
	}
	if _, err := repo.UserID(context.Background(), token); !errors.Is(err, ErrSessionNotFound) {
		t.Fatalf("got %v", err)
	}
}

func TestMemorySessionRepositoryExpiresToken(t *testing.T) {
	now := time.Date(2026, 6, 19, 0, 0, 0, 0, time.UTC)
	repo := NewMemorySessionRepository(func() time.Time { return now })
	token, err := repo.Create(context.Background(), "user-1", now.Add(time.Minute))
	if err != nil {
		t.Fatal(err)
	}
	now = now.Add(2 * time.Minute)
	if _, err := repo.UserID(context.Background(), token); !errors.Is(err, ErrSessionNotFound) {
		t.Fatalf("got %v", err)
	}
}

func TestHashTokenDoesNotContainPlaintext(t *testing.T) {
	token := "plain-session-token"
	hash := HashToken(token)
	if string(hash[:]) == token {
		t.Fatal("hash contains plaintext token")
	}
}
