package handlers

import (
	"context"
	"sync/atomic"
	"testing"
	"time"
)

func TestRunCoworkingMaintenanceStopsAfterCancellation(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())
	var calls atomic.Int32
	done := make(chan struct{})

	go func() {
		runCoworkingMaintenance(ctx, time.Millisecond, func() { calls.Add(1) }, func() {})
		close(done)
	}()

	deadline := time.After(250 * time.Millisecond)
	for calls.Load() == 0 {
		select {
		case <-deadline:
			t.Fatal("maintenance did not run")
		default:
			time.Sleep(time.Millisecond)
		}
	}

	cancel()
	select {
	case <-done:
	case <-time.After(250 * time.Millisecond):
		t.Fatal("maintenance did not stop")
	}
}
