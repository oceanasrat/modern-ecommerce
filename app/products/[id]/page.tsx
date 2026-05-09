import Link from "next/link"
import { notFound } from "next/navigation"
import { getProduct } from "@/lib/queries"
import ProductGallery from "@/components/products/ProductGallery"
import { ChevronLeft, Truck, Shield, RotateCcw } from "lucide-react"

export const revalidate = 0

// ✅ Use 'any' for Props to bypass strict Next.js 15 type conflicts during debug
export default async function ProductPage({ params }: any) {
  try {
    // ✅ FIX: Await params (Required for Next.js 15)
    const resolvedParams = await params
    const id = resolvedParams?.id ? decodeURIComponent(resolvedParams.id) : null

    if (!id) return notFound()

    // ✅ Fetch data
    const product = await getProduct(id)

    // If Sanity returns nothing, show the 404 page instead of crashing
    if (!product) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <p className="text-muted-foreground mt-2">The item "{id}" could not be retrieved from the database.</p>
          <Link href="/" className="mt-6 bg-black text-white px-8 py-3 rounded-full font-bold">
            Return to Store
          </Link>
        </div>
      )
    }

    // ✅ Safe Price Logic
    const rawPrice = Number(product.price)
    const displayPrice = isNaN(rawPrice) || rawPrice === 0 
      ? "Price on Request" 
      : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(rawPrice)

    return (
      <main className="min-h-screen bg-background pb-20">
        <div className="mx-auto max-w-[1400px] px-4 pt-10 sm:px-6 lg:px-8">
          <Link href="/" className="group mb-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Collections
          </Link>

          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-20">
            {/* GALLERY SECTION */}
            <section className="lg:sticky lg:top-24 lg:col-span-7">
              {/* ✅ Ensure images is always an array */}
              <ProductGallery images={Array.isArray(product.images) ? product.images : []} />
            </section>

            {/* CONTENT SECTION */}
            <section className="flex flex-col lg:col-span-5 lg:py-10">
              <div className="mb-8 space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {product.category || "Exclusive Collection"}
                </span>
                <h1 className="text-5xl font-black tracking-tighter text-foreground lg:text-6xl">
                  {product.name || "Untitled Product"}
                </h1>
                <p className="text-3xl font-light text-foreground/90">{displayPrice}</p>
              </div>

              <p className="text-lg leading-relaxed text-muted-foreground/90">
                {product.description || "Expertly crafted for the modern lifestyle."}
              </p>

              {/* TRUST BADGES */}
              <div className="my-12 grid grid-cols-3 gap-4 border-y border-zinc-100 py-10 dark:border-zinc-800">
                <div className="flex flex-col items-center gap-3 text-center">
                  <Truck className="h-6 w-6" strokeWidth={1} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-3 border-x text-center px-2">
                  <Shield className="h-6 w-6" strokeWidth={1} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center gap-3 text-center">
                  <RotateCcw className="h-6 w-6" strokeWidth={1} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">30-Day Returns</span>
                </div>
              </div>

              <button className="flex w-full items-center justify-center rounded-full bg-black py-6 text-base font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] dark:bg-white dark:text-black">
                Add to Cart — {displayPrice}
              </button>
            </section>
          </div>
        </div>
      </main>
    )
  } catch (error) {
    // ✅ This catch block prevents the "Digest" white screen error
    console.error("CRITICAL PAGE ERROR:", error)
    return notFound()
  }
}
