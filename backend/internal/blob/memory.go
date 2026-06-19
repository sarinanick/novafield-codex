package blob

import (
	"context"
	"fmt"
	"io"
	"strings"
	"sync"
)

type Object struct {
	ContentType string
	Data        []byte
}

type MemoryStore struct {
	mu         sync.RWMutex
	objects    map[string]Object
	publicBase string
	FailPutAt  int
	putCount   int
}

func NewMemoryStore(publicBase string) *MemoryStore {
	return &MemoryStore{objects: make(map[string]Object), publicBase: strings.TrimRight(publicBase, "/")}
}

func (s *MemoryStore) Put(_ context.Context, key, contentType string, body io.Reader, size int64) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.putCount++
	if s.FailPutAt > 0 && s.putCount == s.FailPutAt {
		return fmt.Errorf("injected put failure")
	}
	data, err := io.ReadAll(io.LimitReader(body, size+1))
	if err != nil {
		return err
	}
	if int64(len(data)) != size {
		return fmt.Errorf("object size mismatch")
	}
	s.objects[key] = Object{ContentType: contentType, Data: data}
	return nil
}

func (s *MemoryStore) Delete(_ context.Context, key string) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	delete(s.objects, key)
	return nil
}

func (s *MemoryStore) PublicURL(key string) string {
	return s.publicBase + "/" + strings.TrimLeft(key, "/")
}

func (s *MemoryStore) Objects() map[string]Object {
	s.mu.RLock()
	defer s.mu.RUnlock()
	result := make(map[string]Object, len(s.objects))
	for key, object := range s.objects {
		result[key] = object
	}
	return result
}
