"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import CartDrawer from "@/components/cart/CartDrawer"
import { useCartStore } from "@/lib/store"
import ThemeToggle from "@/components/layout/ThemeToggle"

export default function Navbar() {

  const [open, setOpen] = useState(false)

  const items = useCartStore((state) => state.items)

  return (
    <>
<header className="flex items-center justify-between px-6 py-4 border-b">

  <h2 className="text-xl font-bold">
    Future Commerce
  </h2>

  <div className="flex gap-3">

    <ThemeToggle />

    <Button onClick={() => setOpen(true)}>
      Cart ({items.length})
    </Button>

  </div>

</header>

      <CartDrawer open={open} setOpen={setOpen} />

    </>
  )
}