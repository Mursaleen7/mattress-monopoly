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
  title: "DisposalGrid | Mattress Disposal Made Simple",
  description: "Find local mattress disposal regulations and book professional eco-friendly pickup services in your city. Trusted by thousands of homeowners nationwide.",
  keywords: ["mattress disposal", "mattress recycling", "mattress pickup", "dispose of mattress", "eco-friendly mattress disposal", "mattress removal"],
  openGraph: {
    title: "DisposalGrid | Mattress Disposal Made Simple",
    description: "Find local mattress disposal rules and book professional pickup services in seconds.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1A1A1A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#1A1A1A]">
      <head>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="impact-site-verification" value="917b1ec7-dc5d-4706-a9d7-b4eb50adadea" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#1A1A1A]`}
      >
        {children}
      </body>
    </html>
  );
}
