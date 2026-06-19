package auth

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"time"
)

var ErrSessionNotFound = errors.New("session not found")

type SessionRepository interface {
	Create(context.Context, string, time.Time) (string, error)
	UserID(context.Context, string) (string, error)
	Revoke(context.Context, string) error
}

func NewSessionToken() (string, error) {
	random := make([]byte, 32)
	if _, err := rand.Read(random); err != nil {
		return "", err
	}
	return hex.EncodeToString(random), nil
}

func HashToken(token string) [sha256.Size]byte {
	return sha256.Sum256([]byte(token))
}
