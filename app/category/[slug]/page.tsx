import { notFound } from "next/navigation"
import { getProductsByCategory, getCategory } from "@/lib/queries"
import ProductCard from "@/components/products/ProductCard"

export const revalidate = 0

type Props = {
  params: Promise<{ slug: string }> | { slug: string }
}

export default async function CategoryPage({ params }: Props) {
  // ✅ FIX 1: Safely await and decode params for Next.js 15
  const resolvedParams = await params
  const slug = decodeURIComponent(resolvedParams.slug)

  // ✅ FIX 2: Add a try/catch or robust fallback for data fetching
  // Using Promise.all is fast, but we need to ensure it doesn't crash the whole page
  let products = []
  let category = null

  try {
    const [fetchedProducts, fetchedCategory] = await Promise.all([
      getProductsByCategory(slug),
      getCategory(slug),
    ])
    products = fetchedProducts || []
    category = fetchedCategory
  } catch (error) {
    console.error("Category Fetch Error:", error)
  }

  // If the category object is missing, show the 404 page
  if (!category) return notFound()

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      {/* CATEGORY HEADER */}
      <div className="mb-12 space-y-4">
        <h1 className="text-5xl font-black uppercase tracking-tighter text-foreground lg:text-7xl">
          {category.name || slug}
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
          {category.description || `Explore our curated selection of premium ${category.name} essentials.`}
        </p>
      </div>

      {/* PRODUCT GRID */}
      {Array.isArray(products) && products.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p: any) => (
            // The ProductCard now handles the ID/Slug and Price safety internally
            <ProductCard key={p._id || p.id} product={p} />
          ))}
        </div>
      ) : (
        // EMPTY STATE: Prevents a blank screen if no products exist
        <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed rounded-3xl border-zinc-100 dark:border-zinc-800">
          <p className="text-xl font-medium text-muted-foreground">
            Our {category.name} collection is being updated.
          </p>
          <p className="text-sm text-zinc-400 mt-2">New items arriving soon.</p>
        </div>
      )}
    </main>
  )
}
