import { getProducts } from "@/lib/queries"
import ProductCard from "@/components/products/ProductCard"

export default async function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const products = await getProducts()

  const filtered = products.filter(
    (p: any) =>
      p.category?.trim().toLowerCase() === params.slug.toLowerCase()
  )

  return (
    <main className="container mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold mb-10 capitalize">
        {params.slug} Products
      </h1>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">
            No products found in this category
          </h2>
          <p className="text-muted-foreground mt-2">
            Try another category
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((product: any) => (
            <ProductCard
              key={product._id}
              product={{
                ...product,
                id: product._id, // ✅ FIX (CRITICAL)
              }}
            />
          ))}
        </div>
      )}

    </main>
  )
}
