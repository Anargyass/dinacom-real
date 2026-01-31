import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";


const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Preder - Platform Belajar untuk Disleksia denagn AI Assisted Learning",
  description: "Platform pembelajaran interaktif khusus untuk penyandang disleksia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" style={{ fontFamily: 'var(--font-lexend), sans-serif' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${lexend.variable} antialiased`}
        style={{ fontFamily: '"Lexend", sans-serif' }}
      >
        <div className="min-h-screen flex flex-col">
          <div className="sticky top-0 z-50">
            <Navbar />
          </div>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
