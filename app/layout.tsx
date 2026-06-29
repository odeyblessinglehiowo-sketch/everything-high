import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://everythinghighacademy.com"),

  title: {
    default: "Everything High Modelling Academy",
    template: "%s | Everything High Modelling Academy",
  },

  description:
    "Nigeria's premium modelling academy helping aspiring models build confidence, master runway techniques, build professional portfolios, and launch successful modelling careers.",

  keywords: [
    "Everything High",
    "Everything High Academy",
    "Everything High Modelling Academy",
    "Modelling Academy Nigeria",
    "Model Training Abuja",
    "Runway Training",
    "Catwalk Training",
    "Professional Models",
    "Become a Model",
    "Fashion Academy Nigeria",
    "Beauty Academy",
    "Portfolio Development",
    "Pageantry Training",
    "Model Coaching",
  ],

  authors: [
    {
      name: "Everything High",
      url: "https://everythinghighacademy.com",
    },
  ],

  creator: "Everything High",

  openGraph: {
    title: "Everything High Modelling Academy",
    description:
      "Train. Walk. Shine. Join Nigeria's premium modelling academy and begin your professional modelling journey.",

    url: "https://everythinghighacademy.com",

    siteName: "Everything High",

    locale: "en_NG",

    type: "website",

    images: [
      {
        url: "/images/og1-image.jpg",
        width: 1200,
        height: 630,
        alt: "Everything High Modelling Academy",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Everything High Modelling Academy",

    description:
      "Train. Walk. Shine. Join Nigeria's premium modelling academy.",

    images: ["/images/og1-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: "https://everythinghighacademy.com",
  },

  category: "Education",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
