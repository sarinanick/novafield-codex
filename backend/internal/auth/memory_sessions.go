package auth

import (
	"context"
	"sync"
	"time"
)

type memorySession struct {
	userID    string
	expiresAt time.Time
}

type MemorySessionRepository struct {
	mu       sync.RWMutex
	sessions map[[32]byte]memorySession
	now      func() time.Time
}

func NewMemorySessionRepository(now func() time.Time) *MemorySessionRepository {
	if now == nil {
		now = time.Now
	}
	return &MemorySessionRepository{sessions: make(map[[32]byte]memorySession), now: now}
}

func (r *MemorySessionRepository) Create(_ context.Context, userID string, expiresAt time.Time) (string, error) {
	token, err := NewSessionToken()
	if err != nil {
		return "", err
	}
	r.mu.Lock()
	r.sessions[HashToken(token)] = memorySession{userID: userID, expiresAt: expiresAt}
	r.mu.Unlock()
	return token, nil
}

func (r *MemorySessionRepository) UserID(_ context.Context, token string) (string, error) {
	hash := HashToken(token)
	r.mu.RLock()
	entry, ok := r.sessions[hash]
	r.mu.RUnlock()
	if !ok || !entry.expiresAt.After(r.now()) {
		if ok {
			r.mu.Lock()
			delete(r.sessions, hash)
			r.mu.Unlock()
		}
		return "", ErrSessionNotFound
	}
	return entry.userID, nil
}

func (r *MemorySessionRepository) Revoke(_ context.Context, token string) error {
	r.mu.Lock()
	delete(r.sessions, HashToken(token))
	r.mu.Unlock()
	return nil
}
