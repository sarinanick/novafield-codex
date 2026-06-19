package state

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

var ErrInvalidDocument = errors.New("state document is not valid JSON")

type PostgresRepository struct {
	pool *pgxpool.Pool
}

func NewPostgresRepository(pool *pgxpool.Pool) *PostgresRepository {
	return &PostgresRepository{pool: pool}
}

func (r *PostgresRepository) Load(ctx context.Context) (Document, error) {
	var doc Document
	if err := r.pool.QueryRow(ctx, "SELECT revision, payload FROM application_state WHERE id=1").Scan(&doc.Revision, &doc.Payload); err != nil {
		return Document{}, fmt.Errorf("load application state: %w", err)
	}
	return doc, nil
}

func (r *PostgresRepository) Update(ctx context.Context, update func(json.RawMessage) (json.RawMessage, error)) error {
	tx, err := r.pool.Begin(ctx)
	if err != nil {
		return fmt.Errorf("begin state update: %w", err)
	}
	defer tx.Rollback(ctx)

	var revision int64
	var payload json.RawMessage
	if err := tx.QueryRow(ctx, "SELECT revision, payload FROM application_state WHERE id=1 FOR UPDATE").Scan(&revision, &payload); err != nil {
		return fmt.Errorf("lock application state: %w", err)
	}
	next, err := update(append(json.RawMessage(nil), payload...))
	if err != nil {
		return err
	}
	if err := r.validate(next); err != nil {
		return err
	}
	if _, err := tx.Exec(ctx, `
		UPDATE application_state
		SET revision=$1, payload=$2, updated_at=now()
		WHERE id=1`, revision+1, next); err != nil {
		return fmt.Errorf("write application state: %w", err)
	}
	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("commit application state: %w", err)
	}
	return nil
}

func (r *PostgresRepository) validate(payload json.RawMessage) error {
	if !json.Valid(payload) {
		return ErrInvalidDocument
	}
	return nil
}
