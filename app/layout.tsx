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
  title: "SEPT - Solar Energy Protection Technology",
  description: "Making Solar Energy Safer, Smarter & More Sustainable. SEPT delivers intelligent rapid shutdown compliance and real-time fault detection through Solar Sense.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
  themeColor: "#059669",
  manifest: "/manifest.json",
  icons: {
    icon: "/SolarSense_Logo.png",
    apple: "/SolarSense_Logo.png",
  },
  openGraph: {
    title: "SEPT - Solar Energy Protection Technology",
    description: "Making Solar Energy Safer, Smarter & More Sustainable",
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
