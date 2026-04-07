"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"
import { ShoppingCart, Star } from "lucide-react"

type Product = {
  id: string | number
  name: string
  price: string | number
  image: string
  category?: string
  description?: string

  // ✅ NEW (optional fields — safe)
  rating?: number
  reviews?: number
  isBestSeller?: boolean
  stock?: number
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem)

  const numericPrice = Number(product.price)
  const displayPrice = Number.isFinite(numericPrice)
    ? numericPrice.toFixed(2)
    : "0.00"

  const rating = product.rating || 4.5
  const reviews = product.reviews || 120
  const stock = product.stock ?? 10

  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group h-full"
    >
      <Card className="flex h-full flex-col overflow-hidden rounded-3xl border bg-background shadow-sm transition-all duration-300 hover:shadow-xl">

        {/* SINGLE LINK WRAPPER */}
        <Link
          href={`/products/${product.id}`}
          className="block"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">

            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 transition group-hover:opacity-100" />

            {/* 🔥 Best Seller */}
            {product.isBestSeller && (
              <div className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow">
                🔥 Best Seller
              </div>
            )}

            {/* Category */}
            {product.category && (
              <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow">
                {product.category}
              </div>
            )}

            {/* ⭐ Rating (overlay bottom) */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs shadow backdrop-blur">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {rating.toFixed(1)} ({reviews})
            </div>

          </div>
        </Link>

        {/* CONTENT */}
        <CardContent className="flex flex-1 flex-col p-5">

          <h3 className="text-base font-semibold tracking-tight">
            {product.name}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {product.description || "Premium product"}
          </p>

          {/* ⭐ Inline rating (extra trust) */}
          <div className="mt-2 flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviews} reviews)</span>
          </div>

          {/* ⏳ Stock urgency */}
          {stock <= 5 && (
            <p className="mt-2 text-xs font-medium text-red-500">
              ⏳ Only {stock} left in stock
            </p>
          )}

          <div className="mt-5 flex items-center justify-between">

            <p className="text-lg font-semibold">
              ${displayPrice}
            </p>

            {/* BUTTON */}
            <Button
              size="sm"
              className="rounded-full px-4"
              onClick={(e) => {
                e.preventDefault()
                addItem({
                  id: String(product.id),
                  name: product.name,
                  price: numericPrice,
                  image: product.image,
                  quantity: 1,
                })
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>

          </div>

        </CardContent>

      </Card>
    </motion.div>
  )
}
