import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { RealtimeProvider } from "@/lib/realtime-context";
import { ThemeProvider } from "@/lib/theme-context";
import { ShortcutsProvider } from "@/lib/shortcuts";
import SearchModal from "@/components/search-modal";
import ShortcutsHelp from "@/components/shortcuts-help";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "NovaField",
  description: "A creative marketplace for AI freelancers and tools.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-white text-black`}>
        <ThemeProvider>
          <AuthProvider>
            <ShortcutsProvider>
              <RealtimeProvider>
                {children}
                <SearchModal />
                <ShortcutsHelp />
              </RealtimeProvider>
            </ShortcutsProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
