import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import { ThemeProvider } from "next-themes"
import PageTransition from "@/components/layout/PageTransition"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>

        <ThemeProvider attribute="class" defaultTheme="system">

          <Navbar />

          <PageTransition>
           {children}
          </PageTransition>

      

        </ThemeProvider>

      </body>
    </html>
  )
}