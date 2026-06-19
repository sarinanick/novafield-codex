package config

import (
	"errors"
	"testing"
	"time"
)

func validProductionEnv() map[string]string {
	return map[string]string{
		"APP_ENV":            "production",
		"PORT":               "3001",
		"DATABASE_URL":       "postgres://user:pass@db:5432/novafield",
		"SESSION_SECRET":     "0123456789abcdef0123456789abcdef",
		"CORS_ORIGINS":       "https://novafield.example",
		"SHUTDOWN_TIMEOUT":   "20s",
		"S3_ENDPOINT":        "s3.example.test",
		"S3_ACCESS_KEY":      "access",
		"S3_SECRET_KEY":      "secret",
		"S3_BUCKET":          "novafield",
		"S3_PUBLIC_BASE_URL": "https://cdn.example.test/novafield",
		"S3_USE_TLS":         "true",
	}
}

func TestLoadProductionConfiguration(t *testing.T) {
	cfg, err := Load(MapLookup(validProductionEnv()))
	if err != nil {
		t.Fatal(err)
	}
	if cfg.Environment != "production" || cfg.Port != "3001" {
		t.Fatalf("unexpected config: %+v", cfg)
	}
	if cfg.ShutdownTimeout != 20*time.Second {
		t.Fatalf("shutdown timeout=%s", cfg.ShutdownTimeout)
	}
	if len(cfg.CORSOrigins) != 1 || cfg.CORSOrigins[0] != "https://novafield.example" {
		t.Fatalf("cors origins=%v", cfg.CORSOrigins)
	}
	if !cfg.S3.UseTLS {
		t.Fatal("expected S3 TLS")
	}
}

func TestLoadProductionRequiresSecretsAndServices(t *testing.T) {
	tests := []struct {
		key  string
		want error
	}{
		{"DATABASE_URL", ErrDatabaseURLRequired},
		{"SESSION_SECRET", ErrSessionSecretRequired},
		{"CORS_ORIGINS", ErrCORSOriginsRequired},
		{"S3_ENDPOINT", ErrS3EndpointRequired},
		{"S3_ACCESS_KEY", ErrS3AccessKeyRequired},
		{"S3_SECRET_KEY", ErrS3SecretKeyRequired},
		{"S3_BUCKET", ErrS3BucketRequired},
		{"S3_PUBLIC_BASE_URL", ErrS3PublicBaseURLRequired},
	}

	for _, tt := range tests {
		t.Run(tt.key, func(t *testing.T) {
			env := validProductionEnv()
			delete(env, tt.key)
			_, err := Load(MapLookup(env))
			if !errors.Is(err, tt.want) {
				t.Fatalf("got %v, want %v", err, tt.want)
			}
		})
	}
}

func TestLoadRejectsUnsafeProductionValues(t *testing.T) {
	t.Run("wildcard CORS", func(t *testing.T) {
		env := validProductionEnv()
		env["CORS_ORIGINS"] = "*"
		_, err := Load(MapLookup(env))
		if !errors.Is(err, ErrWildcardCORSForbidden) {
			t.Fatalf("got %v", err)
		}
	})

	t.Run("short session secret", func(t *testing.T) {
		env := validProductionEnv()
		env["SESSION_SECRET"] = "short"
		_, err := Load(MapLookup(env))
		if !errors.Is(err, ErrSessionSecretTooShort) {
			t.Fatalf("got %v", err)
		}
	})
}

func TestLoadDevelopmentDefaults(t *testing.T) {
	cfg, err := Load(MapLookup(map[string]string{"APP_ENV": "development"}))
	if err != nil {
		t.Fatal(err)
	}
	if cfg.Port != "3001" || cfg.ShutdownTimeout != 15*time.Second {
		t.Fatalf("unexpected defaults: %+v", cfg)
	}
}
