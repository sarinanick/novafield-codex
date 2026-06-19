package favorites

import (
	"context"
	"testing"
)

func TestMemoryRepositoryToggle(t *testing.T) {
	repo := NewMemoryRepository()
	favorited, err := repo.Toggle(context.Background(), "user-1", "gig-1")
	if err != nil || !favorited {
		t.Fatalf("favorited=%v err=%v", favorited, err)
	}
	favorited, err = repo.Toggle(context.Background(), "user-1", "gig-1")
	if err != nil || favorited {
		t.Fatalf("favorited=%v err=%v", favorited, err)
	}
}
