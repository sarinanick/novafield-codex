package server

import (
	"context"
	"errors"
	"net"
	"net/http"
	"time"
)

func New(addr string, handler http.Handler) *http.Server {
	return &http.Server{
		Addr:              addr,
		Handler:           handler,
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       60 * time.Second,
	}
}

func Serve(ctx context.Context, httpServer *http.Server, listener net.Listener, shutdownTimeout time.Duration) error {
	serveDone := make(chan error, 1)
	go func() { serveDone <- httpServer.Serve(listener) }()
	select {
	case err := <-serveDone:
		if errors.Is(err, http.ErrServerClosed) {
			return nil
		}
		return err
	case <-ctx.Done():
	}
	shutdownCtx, cancel := context.WithTimeout(context.Background(), shutdownTimeout)
	defer cancel()
	if err := httpServer.Shutdown(shutdownCtx); err != nil {
		return err
	}
	err := <-serveDone
	if errors.Is(err, http.ErrServerClosed) {
		return nil
	}
	return err
}
