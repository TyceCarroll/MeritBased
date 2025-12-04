import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "MERITBASED - Merit-Based Scholarships & Opportunities for Underclassmen",
  description:
    "Discover merit-based scholarships and opportunities for middle school and high school underclassmen. No application fees, no attendance fees - just recognition for your achievements.",
  keywords: [
    "scholarships",
    "opportunities",
    "merit-based",
    "underclassmen",
    "middle school",
    "high school",
    "free",
    "no fees",
  ],
  authors: [{ name: "MERITBASED" }],
  creator: "MERITBASED",
  publisher: "MERITBASED",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://meritbased.com",
    siteName: "MERITBASED",
    title: "MERITBASED - Merit-Based Scholarships & Opportunities",
    description: "Discover merit-based scholarships and opportunities for underclassmen. No fees, just merit.",
    images: [
      {
        url: "/images/logo-with-text.png",
        width: 1200,
        height: 630,
        alt: "MERITBASED Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MERITBASED - Merit-Based Scholarships & Opportunities",
    description: "Discover merit-based scholarships and opportunities for underclassmen. No fees, just merit.",
    images: ["/images/logo-with-text.png"],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <div className="flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

        {/* Vercel Analytics */}
        <Script src="https://va.vercel-scripts.com/v1/script.js" />

        {/* Vercel Speed Insights */}
        <Script src="https://va.vercel-scripts.com/v1/speed-insights/script.js" />
      </body>
    </html>
  )
}
