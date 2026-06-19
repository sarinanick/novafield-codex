package favorites

import (
	"context"
	"sync"
)

type MemoryRepository struct {
	mu    sync.Mutex
	items map[string]map[string]bool
}

func NewMemoryRepository() *MemoryRepository {
	return &MemoryRepository{items: make(map[string]map[string]bool)}
}

func (r *MemoryRepository) Toggle(_ context.Context, userID, gigID string) (bool, error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	if r.items[userID] == nil {
		r.items[userID] = make(map[string]bool)
	}
	if r.items[userID][gigID] {
		delete(r.items[userID], gigID)
		return false, nil
	}
	r.items[userID][gigID] = true
	return true, nil
}
