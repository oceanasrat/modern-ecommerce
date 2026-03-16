"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"
import Link from "next/link"

export default function ProductCard({ product }: any) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card className="rounded-2xl overflow-hidden">

<Link href={`/products/${product.id}`}>
  <img
    src={product.image}
    alt={product.name}
    className="w-full h-60 object-cover"
  />
</Link>

        <CardContent className="p-4">

          <h3 className="font-semibold text-lg">
            {product.name}
          </h3>

          <p className="text-muted-foreground">
            ${product.price}
          </p>

          <Button
            className="mt-3 w-full"
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
              })
            }
          >
            Add to Cart
          </Button>

        </CardContent>
      </Card>
    </motion.div>
  )
}