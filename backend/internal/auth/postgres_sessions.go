package auth

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type PostgresSessionRepository struct {
	pool *pgxpool.Pool
}

func NewPostgresSessionRepository(pool *pgxpool.Pool) *PostgresSessionRepository {
	return &PostgresSessionRepository{pool: pool}
}

func (r *PostgresSessionRepository) Create(ctx context.Context, userID string, expiresAt time.Time) (string, error) {
	token, err := NewSessionToken()
	if err != nil {
		return "", fmt.Errorf("generate session token: %w", err)
	}
	hash := HashToken(token)
	if _, err := r.pool.Exec(ctx, "INSERT INTO sessions(token_hash,user_id,expires_at) VALUES($1,$2,$3)", hash[:], userID, expiresAt); err != nil {
		return "", fmt.Errorf("create session: %w", err)
	}
	return token, nil
}

func (r *PostgresSessionRepository) UserID(ctx context.Context, token string) (string, error) {
	hash := HashToken(token)
	var userID string
	err := r.pool.QueryRow(ctx, "SELECT user_id FROM sessions WHERE token_hash=$1 AND expires_at > now()", hash[:]).Scan(&userID)
	if errors.Is(err, pgx.ErrNoRows) {
		return "", ErrSessionNotFound
	}
	if err != nil {
		return "", fmt.Errorf("resolve session: %w", err)
	}
	return userID, nil
}

func (r *PostgresSessionRepository) Revoke(ctx context.Context, token string) error {
	hash := HashToken(token)
	if _, err := r.pool.Exec(ctx, "DELETE FROM sessions WHERE token_hash=$1", hash[:]); err != nil {
		return fmt.Errorf("revoke session: %w", err)
	}
	return nil
}
