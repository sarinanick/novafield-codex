package favorites

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

type PostgresRepository struct {
	pool *pgxpool.Pool
}

func NewPostgresRepository(pool *pgxpool.Pool) *PostgresRepository {
	return &PostgresRepository{pool: pool}
}

func (r *PostgresRepository) Toggle(ctx context.Context, userID, gigID string) (bool, error) {
	tx, err := r.pool.Begin(ctx)
	if err != nil {
		return false, fmt.Errorf("begin favorite toggle: %w", err)
	}
	defer tx.Rollback(ctx)

	result, err := tx.Exec(ctx, "DELETE FROM favorites WHERE user_id=$1 AND gig_id=$2", userID, gigID)
	if err != nil {
		return false, fmt.Errorf("delete favorite: %w", err)
	}
	favorited := result.RowsAffected() == 0
	if favorited {
		if _, err := tx.Exec(ctx, "INSERT INTO favorites(user_id,gig_id) VALUES($1,$2)", userID, gigID); err != nil {
			return false, fmt.Errorf("create favorite: %w", err)
		}
	}
	if err := tx.Commit(ctx); err != nil {
		return false, fmt.Errorf("commit favorite toggle: %w", err)
	}
	return favorited, nil
}
