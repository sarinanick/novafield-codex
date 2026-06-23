"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (type: ToastType, title: string, message?: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, title: string, message?: string, duration = 4000) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const toast: Toast = { id, type, title, message, duration };
      setToasts((prev) => [...prev.slice(-4), toast]);
      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

const icons: Record<ToastType, typeof CheckCircle> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const colors: Record<ToastType, string> = {
  success: "border-green-500/20 bg-green-500/10 text-green-600",
  error: "border-red-500/20 bg-red-500/10 text-red-600",
  warning: "border-amber-500/20 bg-amber-500/10 text-amber-600",
  info: "border-blue-500/20 bg-blue-500/10 text-blue-600",
};

const iconColors: Record<ToastType, string> = {
  success: "text-green-500",
  error: "text-red-500",
  warning: "text-amber-500",
  info: "text-blue-500",
};

function ToastContainer({
  toasts,
  removeToast,
}: {
  toasts: Toast[];
  removeToast: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none" aria-live="polite" aria-label="Notifications">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const Icon = icons[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border bg-canvas shadow-lg ${colors[toast.type]}`}
              role="alert"
            >
              <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColors[toast.type]}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink">{toast.title}</p>
                {toast.message && (
                  <p className="text-xs text-muted-foreground mt-0.5">{toast.message}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 p-1 rounded-md hover:bg-surface-soft transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
