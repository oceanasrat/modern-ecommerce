"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CartDrawer from "@/components/cart/CartDrawer"
import { useCartStore } from "@/lib/store"
import ThemeToggle from "@/components/layout/ThemeToggle"
import { ShoppingCart } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const items = useCartStore((state) => state.items)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight transition group-hover:opacity-80">
              Ocean Global
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="transition hover:text-primary">
              Home
            </Link>
            <Link href="/about" className="transition hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="transition hover:text-primary">
              Contact
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Cart Button */}
            <Button
              variant="outline"
              onClick={() => setOpen(true)}
              className="relative flex items-center gap-2 rounded-full px-4"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="text-sm">Cart</span>

              {items.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {items.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <CartDrawer open={open} setOpen={setOpen} />
    </>
  )
}