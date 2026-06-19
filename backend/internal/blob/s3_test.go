package blob

import (
	"testing"

	"novafield-api/internal/config"
)

func TestS3PublicURL(t *testing.T) {
	store, err := NewS3Store(config.S3Config{
		Endpoint: "objects.example.test", AccessKey: "key", SecretKey: "secret",
		Bucket: "uploads", PublicBaseURL: "https://cdn.example.test/", UseTLS: true,
	})
	if err != nil {
		t.Fatal(err)
	}
	if got := store.PublicURL("users/u1/avatar.jpg"); got != "https://cdn.example.test/users/u1/avatar.jpg" {
		t.Fatalf("unexpected URL: %s", got)
	}
}
