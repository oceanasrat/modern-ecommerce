"use client"

import { useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"

export default function SearchBar({ products }: any) {
  const [query, setQuery] = useState("")

  const filtered = products.filter((p: any) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="relative mb-10 max-w-xl">

      {/* Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full border bg-background px-10 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Results Dropdown */}
      {query && (
        <div className="absolute left-0 right-0 top-full z-50 mt-3 rounded-2xl border bg-background shadow-lg">

          {filtered.length > 0 ? (
            filtered.slice(0, 6).map((p: any) => (
              <Link
                key={p._id}
                href={`/products/${p._id}`}
                onClick={() => setQuery("")}
              >
                <div className="flex items-center gap-3 px-4 py-3 text-sm transition hover:bg-muted">

                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-10 w-10 rounded-md object-cover"
                  />

                  <span className="font-medium">
                    {p.name}
                  </span>

                </div>
              </Link>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-muted-foreground">
              No products found
            </div>
          )}

        </div>
      )}

    </div>
  )
}