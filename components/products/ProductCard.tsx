"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useCartStore } from "@/lib/store"
import { ShoppingBag, Star } from "lucide-react"

export default function ProductCard({ product }: { product: any }) {
  const addItem = useCartStore((state) => state.addItem)

  // ✅ DEFENSIVE: Get the ID/Slug as a string
  const rawSlug = product?.slug?.current || product?.slug || product?._id || ""
  const productId = typeof rawSlug === 'string' ? rawSlug : ""

  // ✅ DEFENSIVE: Price handling to prevent $NaN
  const rawPrice = Number(product?.price)
  const displayPrice = isNaN(rawPrice) || rawPrice === 0 ? "0.00" : rawPrice.toFixed(2)

  // ✅ DEFENSIVE: Image handling to prevent blue question marks
  const imageSrc = product?.image || "/placeholder.png"

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col gap-4"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
        <Link href={`/products/${productId}`} className="block h-full w-full">
          <Image
            src={imageSrc}
            alt={product?.name || "Product"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
        </Link>

        {product?.isBestSeller && (
          <div className="absolute left-3 top-3 rounded-full bg-black px-3 py-1.5 text-[10px] font-bold uppercase text-white">
            Best Seller
          </div>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => addItem({ ...product, id: productId, quantity: 1, price: rawPrice })}
            className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-xl"
          >
            <ShoppingBag className="h-4 w-4" /> Quick Add
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-sm">
          <p className="text-xs font-semibold uppercase text-muted-foreground">{product?.category || "Premium"}</p>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-current text-yellow-500" />
            <span className="font-medium">{product?.rating || 4.8}</span>
          </div>
        </div>
        <Link href={`/products/${productId}`}>
          <h3 className="line-clamp-1 text-base font-medium">{product?.name || "Unnamed Product"}</h3>
        </Link>
        <p className="text-base font-semibold">${displayPrice}</p>
      </div>
    </motion.div>
  )
}
