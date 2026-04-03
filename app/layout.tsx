import "./globals.css"
<<<<<<< HEAD
import Navbar from "../components/layout/Navbar"
import Footer from "@/components/Footer"
import { ThemeProvider } from "next-themes"
import PageTransition from "../components/layout/PageTransition"
import Script from "next/script"
=======
import Navbar from "@/components/layout/Navbar"
import { ThemeProvider } from "next-themes"
import PageTransition from "@/components/layout/PageTransition"
>>>>>>> 54f665595f0584e34d3735dcffc40828abe7a77f

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
<<<<<<< HEAD
      <body className="flex min-h-screen flex-col">
=======
      <body>
>>>>>>> 54f665595f0584e34d3735dcffc40828abe7a77f

        <ThemeProvider attribute="class" defaultTheme="system">

          <Navbar />

<<<<<<< HEAD
          <main className="flex-1">
            <PageTransition>
              {children}
            </PageTransition>
          </main>

          <Footer />

        </ThemeProvider>
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
=======
          <PageTransition>
           {children}
          </PageTransition>

      

        </ThemeProvider>
>>>>>>> 54f665595f0584e34d3735dcffc40828abe7a77f

      </body>
    </html>
  )
}