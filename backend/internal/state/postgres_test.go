package state

import (
	"context"
	"encoding/json"
	"os"
	"testing"

	"novafield-api/internal/platform/migrate"

	"github.com/jackc/pgx/v5/pgxpool"
)

func TestPostgresRepositoryUpdateIsAtomic(t *testing.T) {
	url := os.Getenv("TEST_DATABASE_URL")
	if url == "" {
		t.Skip("TEST_DATABASE_URL is not set")
	}
	ctx := context.Background()
	pool, err := pgxpool.New(ctx, url)
	if err != nil {
		t.Fatal(err)
	}
	defer pool.Close()
	if err := migrate.Apply(ctx, pool); err != nil {
		t.Fatal(err)
	}
	if _, err := pool.Exec(ctx, "UPDATE application_state SET revision=0, payload='{}'::jsonb WHERE id=1"); err != nil {
		t.Fatal(err)
	}

	repo := NewPostgresRepository(pool)
	err = repo.Update(ctx, func(payload json.RawMessage) (json.RawMessage, error) {
		return json.RawMessage(`{"users":[{"id":"u1"}]}`), nil
	})
	if err != nil {
		t.Fatal(err)
	}

	doc, err := repo.Load(ctx)
	if err != nil {
		t.Fatal(err)
	}
	if doc.Revision != 1 || string(doc.Payload) != `{"users": [{"id": "u1"}]}` {
		t.Fatalf("unexpected document: revision=%d payload=%s", doc.Revision, doc.Payload)
	}
}

func TestPostgresRepositoryRejectsInvalidJSON(t *testing.T) {
	repo := NewPostgresRepository(nil)
	err := repo.validate(json.RawMessage(`{`))
	if err == nil {
		t.Fatal("expected invalid JSON error")
	}
}
