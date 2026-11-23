import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Geist, Geist_Mono, Noto_Sans_Ethiopic } from "next/font/google";
import "./globals.css";
// KaTeX CSS (~200KB) is loaded only on the page that renders math, /chat.
import { LocaleProvider } from "@/components/LocaleProvider";
import { UserProvider } from "@/components/UserProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PWARegister } from "@/components/PWARegister";
import { PageViewTracker } from "@/components/PageViewTracker";
import { ThemeProvider, themeBootstrapScript } from "@/components/ThemeProvider";
import { BRAND, MOTTO } from "@/lib/brand";

// Geist for headings and UI, Geist Mono for labels and numbers, Atkinson
// Hyperlegible for long reading (lessons, the assistant) on low-end phones,
// and Noto Sans Ethiopic for Amharic (ሐሰሳ).
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});
const atkinson = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-atkinson",
});
const ethiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-noto-ethiopic",
});

const TITLE = `${BRAND} · ${MOTTO}`;
const DESCRIPTION =
  "Hasesa (Amharic for \"exploration\") is building an education system for the AI era, tested with real students before it goes to schools across Ethiopia and beyond. Hasesa Academy, hands-on science for teenagers, is our first program.";

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
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#13171C" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${atkinson.variable} ${ethiopic.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased font-sans">
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
