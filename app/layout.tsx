import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
// KaTeX CSS (~200KB) is loaded only on the page that renders math, /chat.
import { LocaleProvider } from "@/components/LocaleProvider";
import { UserProvider } from "@/components/UserProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PWARegister } from "@/components/PWARegister";
import { PageViewTracker } from "@/components/PageViewTracker";
import { ThemeProvider, themeBootstrapScript } from "@/components/ThemeProvider";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const TITLE = "Hasesa — Quality Education for Ethiopian High Schools";
const DESCRIPTION =
  "An AI tutor built for deep understanding, not just exam answers. MoE-aligned lessons in English, each with an at-home experiment. Demo covers Grade 11 Math, Physics, Chemistry, and Biology.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://personalaitutor.app"),
  title: TITLE,
  description: DESCRIPTION,
  manifest: "/manifest.json",
  // Favicon is generated automatically from app/icon.svg (Next file convention),
  // which appends a content-hash to the URL so browsers don't serve a stale icon.
  openGraph: {
    type: "website",
    siteName: "Hasesa",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0d9488" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e0d" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body className="min-h-screen flex flex-col bg-canvas text-ink antialiased font-sans">
        <ThemeProvider>
          <LocaleProvider>
            <UserProvider>
              <Nav />
              <main className="flex-1">{children}</main>
              <Footer />
              <PWARegister />
              <PageViewTracker />
            </UserProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
