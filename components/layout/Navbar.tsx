"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CartDrawer from "@/components/cart/CartDrawer"
import { useCartStore } from "@/lib/store"
import ThemeToggle from "@/components/layout/ThemeToggle"
import { ShoppingCart, Menu } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const items = useCartStore((state) => state.items)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Ocean Global
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-primary">Home</Link>
            <Link href="/about" className="hover:text-primary">About</Link>
            <Link href="/contact" className="hover:text-primary">Contact</Link>
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* Theme toggle ALWAYS visible */}
            <ThemeToggle />

            {/* Cart */}
            <Button
              variant="outline"
              onClick={() => setOpen(true)}
              className="relative flex items-center gap-2 rounded-full px-3 md:px-4"
            >
              <ShoppingCart className="h-4 w-4" />
              
              <span className="hidden md:inline text-sm">Cart</span>

              {items.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {items.length}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {menuOpen && (
          <div className="md:hidden border-t px-4 py-4 space-y-3 bg-background">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block">
              Home
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="block">
              About
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="block">
              Contact
            </Link>
          </div>
        )}
      </header>

      <CartDrawer open={open} setOpen={setOpen} />
    </>
  )
}
