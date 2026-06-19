package state

import (
	"context"
	"encoding/json"
)

type Document struct {
	Revision int64
	Payload  json.RawMessage
}

type Repository interface {
	Load(context.Context) (Document, error)
	Update(context.Context, func(json.RawMessage) (json.RawMessage, error)) error
}
