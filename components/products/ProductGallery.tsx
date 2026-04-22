"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

type Props = {
  images?: string[]
}

export default function ProductGallery({ images }: Props) {
  // ✅ Safe images
  const safeImages = Array.isArray(images) ? images : []

  const [selected, setSelected] = useState<string | null>(null)

  // ✅ Set default image
  useEffect(() => {
    if (safeImages.length > 0) {
      setSelected(safeImages[0])
    }
  }, [safeImages])

  // ✅ Empty state
  if (safeImages.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-muted rounded-xl">
        <p className="text-muted-foreground">No image available</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* ✅ MAIN IMAGE */}
      <div className="overflow-hidden rounded-2xl border bg-white">
        {selected && (
          <motion.img
            key={selected}
            src={selected}
            alt="Product image"
            loading="eager"
            className="w-full h-[400px] md:h-[500px] object-cover cursor-zoom-in"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>

      {/* ✅ THUMBNAILS */}
      <div className="flex gap-3 mt-4 overflow-x-auto">
        {safeImages.map((img) => (
          <button
            key={img}
            onClick={() => setSelected(img)}
            className={`rounded-lg overflow-hidden border-2 transition ${
              selected === img
                ? "border-black"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              alt="Thumbnail"
              loading="lazy"
              className="w-20 h-20 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
