import { getProducts } from "@/lib/queries"
import ProductCard from "@/components/products/ProductCard"
import { notFound } from "next/navigation"

export default async function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const products = await getProducts()

  const filtered = products.filter(
    (p: any) => p.category === params.slug
  )

  if (filtered.length === 0) {
    return notFound()
  }

  return (
    <main className="container mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold mb-10 capitalize">
        {params.slug} Products
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

    </main>
  )
}
