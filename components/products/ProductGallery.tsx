"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function ProductGallery({ images }: { images: string[] }) {
  // 🔍 DEBUG: Open your browser console (F12) to see what is actually arriving
  useEffect(() => {
    console.log("Gallery received images raw data:", images)
  }, [images])

  // ✅ ENHANCED SAFETY: Filters out non-strings and ensures we have a valid array
  const safeImages = Array.isArray(images) && images.length > 0 
    ? images.filter(img => typeof img === 'string' && img.trim() !== "")
    : ["/placeholder.png"]

  const [selected, setSelected] = useState(0)

  // If the index gets out of bounds during a re-render, reset it to 0
  const currentIndex = selected >= safeImages.length ? 0 : selected

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 lg:aspect-auto lg:h-[700px]">
      
      {/* MAIN IMAGE */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <img
            src={safeImages[currentIndex]}
            alt="Product view"
            className="h-full w-full object-cover"
            // ✅ Fallback if the URL itself is broken/404
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.png"
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* THUMBNAIL DOCK */}
      {safeImages.length > 1 && safeImages !== "/placeholder.png" && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 rounded-full bg-black/20 p-2 backdrop-blur-xl dark:bg-white/20">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={cn(
                "relative h-14 w-14 overflow-hidden rounded-full border-2 transition-all duration-300",
                currentIndex === idx
                  ? "border-white scale-110 shadow-lg"
                  : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
              )}
            >
              <img 
                src={img} 
                alt={`Thumbnail ${idx}`} 
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.png"
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
