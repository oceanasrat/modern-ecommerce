"use client"
import { motion } from "framer-motion"
import Link from "next/link"

export default function ProductCard({ product }: { product: any }) {
  // Fix for the $NaN issue: ensure price is a valid number
  const displayPrice = typeof product.price === 'number' 
    ? product.price.toFixed(2) 
    : parseFloat(product.price || 0).toFixed(2);

  // Fix for the broken image: use placeholder if URL is missing
  const imageUrl = product.image || "/placeholder.png";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="group"
    >
      <Link href={`/products/${product._id}`}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-100">
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.isBestSeller && (
            <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-[10px] font-bold uppercase text-white">
              Best Seller
            </span>
          )}
        </div>
        <div className="mt-4 space-y-1">
          <h3 className="text-sm font-medium text-zinc-900">{product.name}</h3>
          <p className="text-sm font-bold text-zinc-900">${displayPrice}</p>
        </div>
      </Link>
    </motion.div>
  )
}
