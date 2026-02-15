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
  title: "Mattress Disposal Guides | Find Local Recycling & Pickup Services",
  description: "Complete guides for mattress disposal and recycling in your city. Find local pickup services, drop-off centers, and eco-friendly disposal options.",
  keywords: ["mattress disposal", "mattress recycling", "bulk trash pickup", "furniture disposal", "eco-friendly disposal"],
  openGraph: {
    title: "Mattress Disposal Guides",
    description: "Find local mattress disposal and recycling options in your city",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
