import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/Footer"
import { ThemeProvider } from "next-themes"
import PageTransition from "@/components/layout/PageTransition"
import Script from "next/script"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata = {
  metadataBase: new URL("https://oceanglobalventuresllc.com"),

  title: {
    default: "Ocean Global Ventures",
    template: "%s | Ocean Global Ventures",
  },

  description:
    "Shop premium products across Health, Beauty, Kitchen, and Pet categories with fast shipping and secure checkout.",

  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`flex min-h-screen flex-col ${inter.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system">

          <Navbar />

          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>

          <Footer />

        </ThemeProvider>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  )
}
