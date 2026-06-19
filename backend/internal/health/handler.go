package health

import (
	"context"
	"net/http"
	"sync/atomic"
	"time"
)

type Pinger interface {
	Ping(context.Context) error
}

type Probes struct {
	pinger  Pinger
	started atomic.Bool
}

func New(pinger Pinger) *Probes { return &Probes{pinger: pinger} }

func (p *Probes) MarkStarted() { p.started.Store(true) }

func (p *Probes) Live(w http.ResponseWriter, _ *http.Request) { w.WriteHeader(http.StatusOK) }

func (p *Probes) Startup(w http.ResponseWriter, _ *http.Request) {
	if !p.started.Load() {
		http.Error(w, "starting", http.StatusServiceUnavailable)
		return
	}
	w.WriteHeader(http.StatusOK)
}

func (p *Probes) Ready(w http.ResponseWriter, r *http.Request) {
	if !p.started.Load() {
		http.Error(w, "starting", http.StatusServiceUnavailable)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)
	defer cancel()
	if p.pinger == nil || p.pinger.Ping(ctx) != nil {
		http.Error(w, "not ready", http.StatusServiceUnavailable)
		return
	}
	w.WriteHeader(http.StatusOK)
}

func (p *Probes) Register(mux *http.ServeMux) {
	mux.HandleFunc("/health/live", p.Live)
	mux.HandleFunc("/health/ready", p.Ready)
	mux.HandleFunc("/health/startup", p.Startup)
}
