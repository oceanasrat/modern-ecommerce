"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function ProductGallery({ images }: any) {

  const [selected, setSelected] = useState(images[0])

  return (
    <div>

      <div className="overflow-hidden rounded-xl">

        <motion.img
          src={selected}
          className="w-full cursor-zoom-in"
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.4 }}
        />

      </div>

      <div className="flex gap-3 mt-4">

        {images.map((img: string) => (
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