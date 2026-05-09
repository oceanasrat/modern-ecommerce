"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useCartStore } from "@/lib/store"
import { ShoppingBag, Star } from "lucide-react"

export default function ProductCard({ product }: { product: any }) {
  const addItem = useCartStore((state) => state.addItem)
  const productId = product._id || product.id

  // 🛠️ FIX: Ensure price is a valid number to prevent $NaN
  const rawPrice = Number(product.price)
  const displayPrice = isNaN(rawPrice) ? "0.00" : rawPrice.toFixed(2)

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col gap-4"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
        <Link href={`/products/${productId}`} className="block h-full w-full">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {product.isBestSeller && (
          <div className="absolute left-3 top-3 rounded-full bg-black/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
            Best Seller
          </div>
        )}

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 translate-y-10 items-center justify-center opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.preventDefault()
              addItem({ 
                id: productId!, 
                name: product.name, 
                image: product.image, 
                quantity: 1, 
                price: rawPrice 
              })
            }}
            className="flex items-center gap-2 rounded-full bg-white/95 px-6 py-3 text-sm font-semibold text-black shadow-2xl backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
          >
            <ShoppingBag className="h-4 w-4" />
            Quick Add
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {product.category || "Premium"}
          </p>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-current text-zinc-900 dark:text-zinc-100" />
            <span className="text-sm font-medium">{product.rating || 4.8}</span>
          </div>
        </div>

        <Link href={`/products/${productId}`}>
          <h3 className="line-clamp-1 text-base font-medium tracking-tight hover:text-muted-foreground transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-base font-semibold">${displayPrice}</p>
      </div>
    </motion.div>
  )
}
