import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LocaleProvider } from "@/components/LocaleProvider";
import { UserProvider } from "@/components/UserProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PWARegister } from "@/components/PWARegister";

export const metadata: Metadata = {
  title: "Personal AI Tutor — Grade 11 tutor",
  description:
    "AI tutor for Ethiopian Grade 11 students. Math, Physics, Chemistry, Biology — MoE syllabus aligned, EUEE-focused. English, Amharic, Afaan Oromo.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0f766e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <LocaleProvider>
          <UserProvider>
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
            <PWARegister />
          </UserProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
