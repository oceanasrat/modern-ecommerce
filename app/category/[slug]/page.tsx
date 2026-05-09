import { notFound } from "next/navigation"
import { getProductsByCategory, getCategory } from "@/lib/queries"
import ProductCard from "@/components/products/ProductCard"

type Props = {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: Props) {
  // ✅ Correctly await params for Next.js 15
  const { slug } = await params

  // Fetch data
  const [products, category] = await Promise.all([
    getProductsByCategory(slug),
    getCategory(slug),
  ])

  // If no category found in Sanity
  if (!category) return notFound()

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-black uppercase tracking-tighter">
          {category.name}
        </h1>
        <p className="mt-4 text-zinc-500">
          {category.description || `Luxury essentials for your ${category.name} lifestyle.`}
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p: any) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border rounded-3xl">
          <p className="text-xl font-medium">New items coming soon.</p>
        </div>
      )}
    </main>
  )
}
