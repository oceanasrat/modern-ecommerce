"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function ProductGallery({
  images,
}: {
  images: string[]
}) {
  // ✅ Clean + validate images
  const safeImages =
    Array.isArray(images) &&
    images.length > 0
      ? images.filter(
          (img) =>
            typeof img === "string" &&
            img.trim() !== "" &&
            img.startsWith("http")
        )
      : []

  // ✅ Final fallback
  const finalImages =
    safeImages.length > 0
      ? safeImages
      : ["/placeholder.png"]

  const [selected, setSelected] = useState(0)

  // ✅ Prevent invalid index
  const currentIndex =
    selected >= finalImages.length
      ? 0
      : selected

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 lg:aspect-auto lg:h-[700px]">

      {/* MAIN IMAGE */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{
            opacity: 0,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <img
            src={finalImages[currentIndex]}
            alt="Product view"
            className="h-full w-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                "/placeholder.png"
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* THUMBNAILS */}
      {finalImages.length > 1 && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 rounded-full bg-black/20 p-2 backdrop-blur-xl dark:bg-white/20">

          {finalImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={cn(
                "relative h-14 w-14 overflow-hidden rounded-full border-2 transition-all duration-300",
                currentIndex === idx
                  ? "scale-110 border-white shadow-lg"
                  : "border-transparent opacity-60 hover:scale-105 hover:opacity-100"
              )}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src =
                    "/placeholder.png"
                }}
              />
            </button>
          ))}

        </div>
      )}
    </div>
  )
}
