import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FEINance",
  description: "FEINance is a platform for managing your finances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <div className="min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <header className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                FEINance
              </h1>
              <p className="text-white/80 text-lg font-light italic">If it's not a HELL YES! then it's a NO</p>
            </header>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
