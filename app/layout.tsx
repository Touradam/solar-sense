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
  title: "Solar Sense - Smart Solar Monitoring & Safety",
  description: "Making Solar Energy Safer, Smarter & More Sustainable. Solar Sense delivers intelligent rapid shutdown compliance and real-time fault detection for photovoltaic systems.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
  themeColor: "#059669",
  manifest: "/manifest.json",
  icons: {
    icon: "/SEPT_logo_Transparent.png",
    apple: "/SEPT_logo_Transparent.png",
  },
  openGraph: {
    title: "Solar Sense - Smart Solar Monitoring & Safety",
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
