import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "Incite Defense | Mobile Self-Defense & Defensive Tactics Training",
  description:
    "Professional mobile self-defense, defensive tactics, and de-escalation training for individuals, organizations, law enforcement, and security personnel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="bg-primary text-white">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Incite Defense
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/#services" className="hover:text-accent transition-colors">
                Services
              </Link>
              <Link href="/#instructors" className="hover:text-accent transition-colors">
                Instructors
              </Link>
              <Link href="/#contact" className="hover:text-accent transition-colors">
                Contact
              </Link>
              <Link
                href="/book"
                className="bg-accent hover:bg-accent-hover px-4 py-2 rounded font-medium transition-colors"
              >
                Book a Session
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-primary text-white py-8">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-300">
            <p>&copy; {new Date().getFullYear()} Incite Defense. All rights reserved.</p>
            <p className="mt-1">Mobile self-defense and defensive tactics training.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
