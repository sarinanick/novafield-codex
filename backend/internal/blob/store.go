package blob

import (
	"context"
	"io"
)

type Store interface {
	Put(ctx context.Context, key, contentType string, body io.Reader, size int64) error
	Delete(ctx context.Context, key string) error
	PublicURL(key string) string
}
