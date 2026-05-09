"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function ProductGallery({ images }: { images: string[] }) {
  const safeImages = images && images.length > 0 ? images : ["/placeholder.png"]
  const [selected, setSelected] = useState(0)

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 lg:aspect-auto lg:h-[700px]">
      
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <img
            src={safeImages[selected]}
            alt="Product view"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* FLOATING DOCK OF THUMBNAILS */}
      {safeImages.length > 1 && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 rounded-full bg-black/20 p-2 backdrop-blur-xl dark:bg-white/20">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={cn(
                "relative h-14 w-14 overflow-hidden rounded-full border-2 transition-all duration-300",
                selected === idx
                  ? "border-white scale-110 shadow-lg"
                  : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
              )}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
