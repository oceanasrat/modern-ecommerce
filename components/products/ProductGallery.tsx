"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function ProductGallery({ images }: { images?: string[] }) {
  // ✅ SAFE FALLBACK
  const safeImages = Array.isArray(images) ? images : []

  const [selected, setSelected] = useState<string | null>(null)

  // ✅ SET DEFAULT IMAGE SAFELY
  useEffect(() => {
    if (safeImages.length > 0) {
      setSelected(safeImages[0])
    }
  }, [safeImages])

  // ❗ If no images, show placeholder instead of crashing
  if (safeImages.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-muted rounded-xl">
        <p className="text-muted-foreground">No image available</p>
      </div>
    )
  }

  return (
    <div>
      <div className="overflow-hidden rounded-xl">
        {selected && (
          <motion.img
            src={selected}
            className="w-full cursor-zoom-in"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </div>

      <div className="flex gap-3 mt-4">
        {safeImages.map((img: string) => (
          <img
            key={img}
            src={img}
            onClick={() => setSelected(img)}
            className="w-20 h-20 object-cover rounded cursor-pointer border hover:scale-110 transition"
          />
        ))}
      </div>
    </div>
  )
}
  
