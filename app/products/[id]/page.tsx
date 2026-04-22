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
  const id = params.id

  const product = await getProduct(id)

  if (!product) {
    return notFound()
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-muted-foreground transition hover:text-foreground"
        >
          ← Back to products
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        
        {/* ✅ IMAGE SECTION */}
        <section className="rounded-3xl border bg-background p-3 shadow-sm">
          <ProductGallery images={product.images ?? []} />
        </section>

        {/* ✅ INFO SECTION */}
        <section className="space-y-6">
          <div className="space-y-3">
            {product.category && (
              <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                {product.category}
              </span>
            )}

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {product.name || "Product"}
              </h1>

              <div className="flex items-center gap-3">
                <p className="text-3xl font-semibold">
                  ${formatPrice(product.price)}
                </p>

                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  Premium Product
                </span>
              </div>
            </div>
          </div>

          {/* ✅ FEATURES */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border bg-muted/30 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Shipping
              </p>
              <p className="mt-1 text-sm font-medium">Fast delivery</p>
            </div>

            <div className="rounded-2xl border bg-muted/30 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Checkout
              </p>
              <p className="mt-1 text-sm font-medium">Secure payment</p>
            </div>

            <div className="rounded-2xl border bg-muted/30 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Returns
              </p>
              <p className="mt-1 text-sm font-medium">30-day policy</p>
            </div>
          </div>

          {/* ✅ DESCRIPTION */}
          <div className="rounded-3xl border bg-background p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Product details</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              {product.description || "No description available."}
            </p>
          </div>

          {/* ✅ EXTRA INFO */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border bg-background p-6 shadow-sm">
              <h3 className="font-semibold">Why customers like it</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Carefully selected for quality, value, and a premium shopping experience.
              </p>
            </div>

            <div className="rounded-3xl border bg-background p-6 shadow-sm">
              <h3 className="font-semibold">What to expect</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                A clean checkout, reliable fulfillment, and support that feels professional.
              </p>
            </div>
          </div>

          {/* ✅ ADD TO CART */}
          <div className="rounded-3xl bg-muted/40 p-6">
            <AddToCartSticky product={product} />
          </div>
        </section>
      </div>
    </main>
  )
}
