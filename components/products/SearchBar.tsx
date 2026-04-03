"use client"

import { useState } from "react"

export default function SearchBar({ products }: any) {

  const [query, setQuery] = useState("")

  const filtered = products.filter((p: any) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="mb-10">

      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border rounded-lg px-4 py-3"
      />

      {query && (
        <div className="mt-4 space-y-2">

          {filtered.map((p: any) => (
            <div
              key={p._id}
              className="border p-3 rounded"
            >
              {p.name}
            </div>
          ))}

        </div>
      )}

    </div>
  )
}