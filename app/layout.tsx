import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atillamrcmk.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Atilla Mercimek — Mobile App Developer",
  description:
    "Software Engineer • Mobile & AI Developer. Flutter ile modern, performanslı ve ölçeklenebilir mobil uygulamalar geliştiriyorum.",
  keywords: [
    "Atilla Mercimek",
    "Mobile App Developer",
    "Flutter Developer",
    "Software Engineer",
    "Portfolio",
    "CV",
  ],
  authors: [{ name: "Atilla Mercimek" }],
  creator: "Atilla Mercimek",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "Atilla Mercimek Portfolio",
    title: "Atilla Mercimek — Mobile App Developer",
    description:
      "Software Engineer • Mobile & AI Developer. Flutter ile modern, performanslı ve ölçeklenebilir mobil uygulamalar geliştiriyorum.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Atilla Mercimek Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atilla Mercimek — Mobile App Developer",
    description:
      "Software Engineer • Mobile & AI Developer. Flutter ile modern, performanslı ve ölçeklenebilir mobil uygulamalar geliştiriyorum.",
    images: ["/og.png"],
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Atilla Mercimek",
    jobTitle: "Mobile App Developer",
    url: siteUrl,
    sameAs: [
      "https://github.com/atillamrcmk",
      "https://www.linkedin.com/in/atilla-mercimek-6025b7222",
    ],
    email: "mercimekatilla53@gmail.com",
    knowsAbout: [
      "Flutter",
      "Dart",
      "Mobile App Development",
      "C#",
      ".NET",
      "Python",
      "OpenCV",
      "Machine Learning",
    ],
  };

  return (
    <html lang="tr" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <a href="#main-content" className="skip-link">
          Ana içeriğe geç
        </a>
        {children}
      </body>
    </html>
  );
}
