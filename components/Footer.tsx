import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mt-24 border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              Ocean Global Ventures
            </h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Premium products sourced globally with a focus on quality,
              reliability, and a professional customer experience.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition">Home</Link>
              <Link href="/about" className="hover:text-foreground transition">About</Link>
              <Link href="/contact" className="hover:text-foreground transition">Contact</Link>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Support</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/refund" className="hover:text-foreground transition">Refund Policy</Link>
              <Link href="/contact" className="hover:text-foreground transition">Customer Support</Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} Ocean Global Ventures LLC
          </p>

          <p className="text-xs">
            Secure payments powered by Stripe
          </p>
        </div>
      </div>
    </footer>
  )
}