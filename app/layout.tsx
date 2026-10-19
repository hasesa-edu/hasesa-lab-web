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
import { RenewBanner } from "@/components/RenewBanner";
import { ThemeProvider, themeBootstrapScript } from "@/components/ThemeProvider";
import { BRAND, MOTTO } from "@/lib/brand";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const TITLE = `${BRAND} · ${MOTTO}`;
const DESCRIPTION =
  "Personalized, hands-on learning guided by real scientists. Curriculum-aligned biology, chemistry and physics experiments for grades 9–12 using local materials, with step-by-step guides, demo videos, and an AI lab assistant.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://hasesa.vercel.app"),
  title: TITLE,
  description: DESCRIPTION,
  manifest: "/manifest.json",
  // Favicon is generated automatically from app/icon.svg (Next file convention),
  // which appends a content-hash to the URL so browsers don't serve a stale icon.
  openGraph: {
    type: "website",
    siteName: BRAND,
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
              <RenewBanner />
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
