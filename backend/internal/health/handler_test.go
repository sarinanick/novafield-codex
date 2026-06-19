package health

import (
	"context"
	"errors"
	"net/http"
	"net/http/httptest"
	"testing"
)

type fakePinger struct{ err error }

func (p fakePinger) Ping(context.Context) error { return p.err }

func TestProbeStatus(t *testing.T) {
	probes := New(fakePinger{})
	assertStatus(t, probes.Live, http.StatusOK)
	assertStatus(t, probes.Startup, http.StatusServiceUnavailable)
	probes.MarkStarted()
	assertStatus(t, probes.Startup, http.StatusOK)
	assertStatus(t, probes.Ready, http.StatusOK)

	probes = New(fakePinger{err: errors.New("database unavailable")})
	probes.MarkStarted()
	assertStatus(t, probes.Ready, http.StatusServiceUnavailable)
}

func assertStatus(t *testing.T, handler http.HandlerFunc, expected int) {
	t.Helper()
	response := httptest.NewRecorder()
	handler(response, httptest.NewRequest(http.MethodGet, "/", nil))
	if response.Code != expected {
		t.Fatalf("expected %d, got %d", expected, response.Code)
	}
}
