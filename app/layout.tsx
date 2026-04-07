import "./globals.css"
import Navbar from "../components/layout/Navbar"
import Footer from "@/components/Footer"
import { ThemeProvider } from "next-themes"
import PageTransition from "../components/layout/PageTransition"
import Script from "next/script"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata = {
  title: "Ocean Global Ventures",
  description:
    "Ocean Global Ventures LLC offers premium products with fast shipping and secure checkout.",

  verification: {
    google: "8Rg5eln8dFtcfxiMpDr7Iy0Q_h_LDPPbmOd2yARQAks",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`flex min-h-screen flex-col antialiased ${inter.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-1">
            <PageTransition>
              {children}
            </PageTransition>
          </main>

          {/* Footer */}
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
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  )
}
