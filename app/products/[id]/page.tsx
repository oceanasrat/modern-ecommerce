import Link from "next/link"
import { notFound } from "next/navigation"
import { getProduct } from "@/lib/queries"
import ProductGallery from "@/components/products/ProductGallery"
import AddToCartSticky from "@/components/products/AddToCartSticky"

type Props = {
  params: { id: string }
}

function formatPrice(price: number | string) {
  const value = Number(price)
  return Number.isFinite(value) ? value.toFixed(2) : "0.00"
}

export default async function ProductPage({ params }: Props) {
  const id = params?.id

  // 🚨 HARD GUARD (CRITICAL FIX)
  if (!id || id === "undefined") {
    console.error("❌ Invalid product ID:", id)
    return notFound()
  }

  const product = await getProduct(id)

  if (!product) {
    return notFound()
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      
      <div className="mb-8">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to products
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        
        {/* IMAGE */}
        <section className="rounded-3xl border bg-background p-3 shadow-sm">
          <ProductGallery images={product.images ?? []} />
        </section>

        {/* INFO */}
        <section className="space-y-6">

          <div>
            <h1 className="text-3xl font-bold">
              {product.name || "Product"}
            </h1>

            <p className="text-2xl font-semibold mt-2">
              ${formatPrice(product.price)}
            </p>
          </div>

          <p className="text-muted-foreground">
            {product.description || "No description available."}
          </p>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>🚚 Fast Shipping</div>
            <div>🔒 Secure Payment</div>
            <div>↩️ Easy Returns</div>
          </div>

          <AddToCartSticky product={product} />

        </section>
      </div>

    </main>
  )
}
