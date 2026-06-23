"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md px-4">
          <div className="text-8xl font-bold text-gray-200 mb-4">!</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
          <p className="text-gray-500 mb-8">
            A critical error occurred. Please refresh the page.
          </p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
