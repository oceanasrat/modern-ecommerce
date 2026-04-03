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
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-base font-semibold tracking-tight transition group-hover:opacity-80">
              Ocean Global
            </span>
            <span className="hidden sm:block text-xs text-muted-foreground">
              Ventures
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
            <Link
              href="/"
              className="relative transition hover:text-primary"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="relative transition hover:text-primary"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="relative transition hover:text-primary"
            >
              Contact
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Theme Toggle */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Cart Button */}
            <Button
              variant="outline"
              onClick={() => setOpen(true)}
              className="relative flex items-center gap-2 rounded-full px-4 transition hover:scale-[1.02]"
            >
              <ShoppingCart className="h-4 w-4" />

              <span className="hidden sm:inline text-sm">
                Cart
              </span>

              {/* Badge */}
              {items.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground shadow">
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