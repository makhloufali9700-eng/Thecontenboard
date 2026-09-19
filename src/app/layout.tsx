import type { Metadata } from "next";
import { Fraunces, Inter, Tajawal } from "next/font/google";
import "./globals.css";
import { IdeasProvider } from "@/context/IdeasContext";
import { Nav } from "@/components/Nav";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const tajawal = Tajawal({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "The Bridge Content Board",
  description: "Content planning and performance tracking for The Bridge by Ali",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${tajawal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <IdeasProvider>
          <Nav />
          <main className="flex-1 w-full">{children}</main>
        </IdeasProvider>
      </body>
    </html>
  );
}
