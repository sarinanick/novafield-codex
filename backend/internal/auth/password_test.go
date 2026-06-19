package auth

import (
	"testing"

	"golang.org/x/crypto/bcrypt"
)

func TestBcryptHasherRoundTrip(t *testing.T) {
	hasher := NewBcryptHasher(bcrypt.MinCost)

	encoded, err := hasher.Hash("password123")
	if err != nil {
		t.Fatal(err)
	}
	if !hasher.Compare(encoded, "password123") {
		t.Fatal("password did not match")
	}
	if hasher.Compare(encoded, "wrong") {
		t.Fatal("wrong password matched")
	}
}

func TestNewBcryptHasherRejectsInvalidCost(t *testing.T) {
	if _, err := NewValidatedBcryptHasher(bcrypt.MinCost - 1); err == nil {
		t.Fatal("expected invalid cost error")
	}
}
