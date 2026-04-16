"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CartDrawer from "@/components/cart/CartDrawer"
import { useCartStore } from "@/lib/store"
import ThemeToggle from "@/components/layout/ThemeToggle"
import { ShoppingCart, Menu, ChevronDown } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)

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
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium relative">

            <Link href="/" className="hover:text-primary">Home</Link>

            {/* 🔥 CATEGORY DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setCategoryOpen(true)}
              onMouseLeave={() => setCategoryOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-primary">
                Categories <ChevronDown className="h-4 w-4" />
              </button>

              {categoryOpen && (
                <div className="absolute top-8 left-0 w-44 rounded-xl border bg-background shadow-lg p-3 space-y-2">
                  <Link href="/category/pet" className="block hover:text-primary">🐶 Pet</Link>
                  <Link href="/category/beauty" className="block hover:text-primary">💄 Beauty</Link>
                  <Link href="/category/kitchen" className="block hover:text-primary">🍳 Kitchen</Link>
                  <Link href="/category/electronics" className="block hover:text-primary">💻 Electronics</Link>
                  <Link href="/category/health" className="block hover:text-primary">💊 Health</Link>
                </div>
              )}
            </div>

            <Link href="/about" className="hover:text-primary">About</Link>
            <Link href="/contact" className="hover:text-primary">Contact</Link>
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-2 md:gap-3">

            <ThemeToggle />

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

        {/* 🔥 MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden border-t px-4 py-4 space-y-4 bg-background">

            <Link href="/" onClick={() => setMenuOpen(false)} className="block">
              Home
            </Link>

            {/* 🔥 Categories (mobile) */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground">
                Categories
              </p>

              <Link href="/category/pet" onClick={() => setMenuOpen(false)} className="block">
                🐶 Pet
              </Link>
              <Link href="/category/beauty" onClick={() => setMenuOpen(false)} className="block">
                💄 Beauty
              </Link>
              <Link href="/category/kitchen" onClick={() => setMenuOpen(false)} className="block">
                🍳 Kitchen
              </Link>
              <Link href="/category/electronics" onClick={() => setMenuOpen(false)} className="block">
                💻 Electronics
              </Link>
              <Link href="/category/health" onClick={() => setMenuOpen(false)} className="block"> 💊 Health
              </Link>
            </div>

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

