import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { RealtimeProvider } from "@/lib/realtime-context";
import { ThemeProvider } from "@/lib/theme-context";
import { ShortcutsProvider } from "@/lib/shortcuts";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ToastProvider } from "@/components/toast";
import SearchModal from "@/components/search-modal";
import ShortcutsHelp from "@/components/shortcuts-help";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["300", "400", "500", "600", "700"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "NovaField AI - Hire AI Freelancers and Sell AI Services",
  description: "Browse AI freelancers for video, image generation, chatbots, automations, design, content, and technical AI projects.",
  keywords: ["AI freelancers", "AI marketplace", "hire AI experts", "AI services", "AI video", "AI automation", "AI chatbot"],
  authors: [{ name: "NovaField" }],
  openGraph: {
    title: "NovaField AI - Hire AI Freelancers and Sell AI Services",
    description: "Browse AI freelancers for video, image generation, chatbots, automations, design, content, and technical AI projects.",
    type: "website",
    locale: "en_US",
    siteName: "NovaField AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaField AI - Hire AI Freelancers and Sell AI Services",
    description: "Browse AI freelancers for video, image generation, chatbots, automations, design, content, and technical AI projects.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans antialiased bg-background text-foreground`}>
        <ErrorBoundary>
          <ThemeProvider>
            <AuthProvider>
              <ShortcutsProvider>
                <RealtimeProvider>
                  <ToastProvider>
                    {children}
                    <SearchModal />
                    <ShortcutsHelp />
                  </ToastProvider>
                </RealtimeProvider>
              </ShortcutsProvider>
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
