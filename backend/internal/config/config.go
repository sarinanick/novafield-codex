package config

import (
	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

var (
	ErrDatabaseURLRequired     = errors.New("DATABASE_URL is required in production")
	ErrSessionSecretRequired   = errors.New("SESSION_SECRET is required in production")
	ErrSessionSecretTooShort   = errors.New("SESSION_SECRET must be at least 32 characters")
	ErrCORSOriginsRequired     = errors.New("CORS_ORIGINS is required in production")
	ErrWildcardCORSForbidden   = errors.New("wildcard CORS is forbidden in production")
	ErrS3EndpointRequired      = errors.New("S3_ENDPOINT is required in production")
	ErrS3AccessKeyRequired     = errors.New("S3_ACCESS_KEY is required in production")
	ErrS3SecretKeyRequired     = errors.New("S3_SECRET_KEY is required in production")
	ErrS3BucketRequired        = errors.New("S3_BUCKET is required in production")
	ErrS3PublicBaseURLRequired = errors.New("S3_PUBLIC_BASE_URL is required in production")
)

type Lookup func(string) (string, bool)

type S3Config struct {
	Endpoint      string
	AccessKey     string
	SecretKey     string
	Bucket        string
	PublicBaseURL string
	UseTLS        bool
}

type Config struct {
	Environment     string
	Port            string
	DatabaseURL     string
	SessionSecret   string
	CORSOrigins     []string
	ShutdownTimeout time.Duration
	S3              S3Config
}

func MapLookup(values map[string]string) Lookup {
	return func(key string) (string, bool) {
		value, ok := values[key]
		return value, ok
	}
}

func LoadOS() (Config, error) {
	return Load(os.LookupEnv)
}

func Load(lookup Lookup) (Config, error) {
	get := func(key, fallback string) string {
		if value, ok := lookup(key); ok {
			return strings.TrimSpace(value)
		}
		return fallback
	}

	environment := strings.ToLower(get("APP_ENV", "development"))
	corsDefault := "http://localhost:3000"
	if environment == "production" {
		corsDefault = ""
	}
	shutdownTimeout, err := time.ParseDuration(get("SHUTDOWN_TIMEOUT", "15s"))
	if err != nil || shutdownTimeout <= 0 {
		return Config{}, fmt.Errorf("invalid SHUTDOWN_TIMEOUT")
	}
	useTLS, err := strconv.ParseBool(get("S3_USE_TLS", "true"))
	if err != nil {
		return Config{}, fmt.Errorf("invalid S3_USE_TLS: %w", err)
	}

	cfg := Config{
		Environment:     environment,
		Port:            get("PORT", "3001"),
		DatabaseURL:     get("DATABASE_URL", ""),
		SessionSecret:   get("SESSION_SECRET", ""),
		CORSOrigins:     splitCSV(get("CORS_ORIGINS", corsDefault)),
		ShutdownTimeout: shutdownTimeout,
		S3: S3Config{
			Endpoint:      get("S3_ENDPOINT", ""),
			AccessKey:     get("S3_ACCESS_KEY", ""),
			SecretKey:     get("S3_SECRET_KEY", ""),
			Bucket:        get("S3_BUCKET", ""),
			PublicBaseURL: strings.TrimRight(get("S3_PUBLIC_BASE_URL", ""), "/"),
			UseTLS:        useTLS,
		},
	}

	if environment == "production" {
		if err := validateProduction(cfg); err != nil {
			return Config{}, err
		}
	}
	return cfg, nil
}

func validateProduction(cfg Config) error {
	checks := []struct {
		value string
		err   error
	}{
		{cfg.DatabaseURL, ErrDatabaseURLRequired},
		{cfg.SessionSecret, ErrSessionSecretRequired},
		{strings.Join(cfg.CORSOrigins, ","), ErrCORSOriginsRequired},
		{cfg.S3.Endpoint, ErrS3EndpointRequired},
		{cfg.S3.AccessKey, ErrS3AccessKeyRequired},
		{cfg.S3.SecretKey, ErrS3SecretKeyRequired},
		{cfg.S3.Bucket, ErrS3BucketRequired},
		{cfg.S3.PublicBaseURL, ErrS3PublicBaseURLRequired},
	}
	for _, check := range checks {
		if check.value == "" {
			return check.err
		}
	}
	if len(cfg.SessionSecret) < 32 {
		return ErrSessionSecretTooShort
	}
	for _, origin := range cfg.CORSOrigins {
		if origin == "*" {
			return ErrWildcardCORSForbidden
		}
	}
	return nil
}

func splitCSV(value string) []string {
	parts := strings.Split(value, ",")
	result := make([]string, 0, len(parts))
	for _, part := range parts {
		if trimmed := strings.TrimSpace(part); trimmed != "" {
			result = append(result, trimmed)
		}
	}
	return result
}
