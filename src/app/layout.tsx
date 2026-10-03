import type { Metadata } from "next";
import "../css/globals.css";
import GlassNavigationBar from "@/components/layout/GlassNavigationBar";
import Footer from "@/components/layout/Footer";
import CursorSpotlight from "@/components/ui/CursorSpotlight";
import FilmGrain from "@/components/ui/FilmGrain";
import AmbientMesh from "@/components/ui/AmbientMesh";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atulrajput.com"),
  title: "Atul Rajput — Engineering Fluid Native & Web Experiences",
  description:
    "I build applications that don't just work—they feel incredible. Merging deep native performance with modern web scaling.",
  keywords: [
    "Atul Rajput",
    "Creative Technologist",
    "React Native Expert",
    "Frontend Architect",
    "UI/UX Engineering",
    "Cross-Platform Scaling",
    "Mobile App Development",
  ],
  openGraph: {
    title: "Atul Rajput — Engineering Fluid Native & Web Experiences",
    description:
      "I build applications that don't just work—they feel incredible. Merging deep native performance with modern web scaling.",
    url: "https://atulrajput.com",
    siteName: "Atul Rajput Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Atul Rajput Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atul Rajput — Engineering Fluid Native & Web Experiences",
    description:
      "I build applications that don't just work—they feel incredible.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <AmbientMesh />
        <FilmGrain />
        <CursorSpotlight />
        <GlassNavigationBar />
        {/* Add top padding so content doesn't hide behind fixed nav */}
        <div id="main-content" style={{ paddingTop: "56px" }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
