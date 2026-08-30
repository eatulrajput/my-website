import type { Metadata } from "next";
import "./globals.css";
import { FeatureFlagProvider } from "@/context/FeatureFlagContext";
import ClientLayout from "@/components/ClientLayout";
import { Inter, JetBrains_Mono } from "next/font/google";


export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_METADATA_BASE || "https://eatulrajput.netlify.app"
  ),
  title: {
    default: "Atul Rajput | Full Stack Software Developer & Engineer",
    template: "%s | Atul Rajput",
  },
  description:
    "Personal portfolio, engineering articles, and project showcase of Atul Rajput — a Full Stack Software Developer specialized in Next.js, React, TypeScript, Python, and Web Engineering.",
  keywords: [
    "Atul Rajput",
    "Software Developer",
    "Full Stack Engineer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Python Developer",
    "Django",
    "Frontend Engineer",
    "Portfolio",
    "Open Source",
  ],
  authors: [{ name: "Atul Rajput", url: "https://eatulrajput.netlify.app" }],
  creator: "Atul Rajput",
  publisher: "Atul Rajput",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo-light.svg",
    shortcut: "/logo-light.svg",
    apple: "/logo-light.svg",
  },
  openGraph: {
    title: "Atul Rajput | Full Stack Software Developer",
    description:
      "Explore portfolio projects, technical articles, engineering experience, and skills of Atul Rajput.",
    url: process.env.NEXT_PUBLIC_METADATA_BASE || "https://eatulrajput.netlify.app",
    siteName: "Atul Rajput Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: process.env.NEXT_PUBLIC_OG_IMAGE || "/og_image.png",
        width: 1200,
        height: 630,
        alt: "Atul Rajput | Full Stack Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atul Rajput | Full Stack Software Developer",
    description:
      "Explore portfolio projects, technical articles, and engineering work of Atul Rajput.",
    creator: "@eatulrajput",
    images: [process.env.NEXT_PUBLIC_OG_IMAGE || "/og_image.png"],
  },
  other: {
    "google-site-verification": "hmT-KJXRDqB0OFt3ijHyQJxdElJsFSM-CwxIZ-rfWqM",
  },
};


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark hide-scrollbar ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <FeatureFlagProvider>
          <ClientLayout>{children}</ClientLayout>
        </FeatureFlagProvider>
      </body>
    </html>
  );
}
