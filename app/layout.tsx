import type { Metadata } from "next";
import "./globals.css";
import { LocaleProvider } from "@/components/LocaleProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI-Edu Ethiopia — Grade 11 tutor",
  description:
    "AI tutor for Ethiopian Grade 11 students. Math, Physics, Chemistry, Biology — MoE syllabus aligned, EUEE-focused. English, Amharic, Afaan Oromo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <LocaleProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
