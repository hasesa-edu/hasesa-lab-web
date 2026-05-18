import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/components/LocaleProvider";
import { UserProvider } from "@/components/UserProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PWARegister } from "@/components/PWARegister";
import { ThemeProvider, themeBootstrapScript } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Personal AI Tutor — for Ethiopian high schools",
  description:
    "AI tutor for Ethiopian high school students. MoE syllabus aligned, EUEE-focused. English, Amharic, Afaan Oromo. Demo content covers Grade 11 Math, Physics, Chemistry, and Biology.",
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
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
            </UserProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
