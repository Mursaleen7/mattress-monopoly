import type { Metadata, Viewport } from "next";
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
  title: "DisposalGrid | Mattress & Bulk Item Disposal Made Simple",
  description: "Find local mattress disposal regulations and book professional eco-friendly pickup services in your city. Trusted by thousands of homeowners nationwide.",
  keywords: ["mattress disposal", "mattress recycling", "bulk trash pickup", "furniture disposal", "eco-friendly disposal", "junk removal"],
  openGraph: {
    title: "DisposalGrid | Mattress & Bulk Item Disposal Made Simple",
    description: "Find local disposal rules and book professional pickup services in seconds.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a2830",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
