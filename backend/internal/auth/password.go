package auth

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

type PasswordHasher interface {
	Hash(password string) (string, error)
	Compare(encoded, password string) bool
}

type BcryptHasher struct {
	cost int
}

func NewBcryptHasher(cost int) BcryptHasher {
	return BcryptHasher{cost: cost}
}

func NewValidatedBcryptHasher(cost int) (BcryptHasher, error) {
	if cost < bcrypt.MinCost || cost > bcrypt.MaxCost {
		return BcryptHasher{}, fmt.Errorf("bcrypt cost must be between %d and %d", bcrypt.MinCost, bcrypt.MaxCost)
	}
	return NewBcryptHasher(cost), nil
}

func (h BcryptHasher) Hash(password string) (string, error) {
	value, err := bcrypt.GenerateFromPassword([]byte(password), h.cost)
	return string(value), err
}

func (h BcryptHasher) Compare(encoded, password string) bool {
	return bcrypt.CompareHashAndPassword([]byte(encoded), []byte(password)) == nil
}
