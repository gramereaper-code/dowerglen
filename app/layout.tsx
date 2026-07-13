import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "@/app/globals.css";
import "@/styles/visuals.css";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PageTransition } from "@/components/animations/page-transition";
import { Providers } from "@/components/layout/providers";
import { SITE } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Rasheed Repairs | Premium Commercial Kitchen & Appliance Repairs",
    template: "%s | Rasheed Repairs"
  },
  description:
    "Nationwide South African repair specialists for commercial kitchen equipment, refrigeration systems, electrical kitchen systems and household appliances.",
  keywords: [
    "Rasheed Repairs",
    "commercial kitchen repairs South Africa",
    "fryer repairs",
    "refrigeration repairs",
    "restaurant equipment technician",
    "appliance repairs South Africa"
  ],
  openGraph: {
    title: "Rasheed Repairs",
    description: "Precision commercial kitchen, refrigeration and appliance repair support across South Africa.",
    url: SITE.url,
    siteName: "Rasheed Repairs",
    images: [
      {
        url: "/images/IMG-20260526-WA0025.jpg",
        width: 1201,
        height: 1600,
        alt: "Technician repairing commercial kitchen equipment"
      }
    ],
    locale: "en_ZA",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Rasheed Repairs",
    description: "Commercial kitchen and appliance repair specialists serving South Africa.",
    images: ["/images/IMG-20260526-WA0025.jpg"]
  }
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Rasheed Repairs",
  description:
    "Commercial kitchen equipment, refrigeration, electrical kitchen system and household appliance repair service across South Africa.",
  areaServed: "South Africa",
  url: SITE.url,
  image: `${SITE.url}/images/IMG-20260526-WA0025.jpg`,
  serviceType: [
    "Commercial kitchen repairs",
    "Industrial kitchen machinery repair",
    "Fast-food equipment repair",
    "Household appliance repairs",
    "Refrigeration system repairs",
    "Electrical kitchen system diagnostics"
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="industrial-shell bg-background text-foreground antialiased">
        <Providers>
          <Navbar />
          <main id="main-content" className="min-h-screen">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
