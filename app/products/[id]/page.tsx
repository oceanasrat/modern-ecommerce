import Link from "next/link"
import { getProduct } from "@/lib/queries"
import ProductGallery from "@/components/products/ProductGallery"
import { ChevronLeft, Truck, Shield, RotateCcw } from "lucide-react"

export const revalidate = 0

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // ✅ NEXT.JS 15 FIX: You MUST await params
  const resolvedParams = await params
  const id = decodeURIComponent(resolvedParams.id)

  const product = await getProduct(id)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p className="text-muted-foreground mt-2">The product ID "{id}" does not exist.</p>
        <Link href="/" className="mt-6 bg-black text-white px-6 py-2 rounded-full">Back Home</Link>
      </div>
    )
  }

  const rawPrice = Number(product.price)
  const displayPrice = isNaN(rawPrice) || rawPrice === 0 
    ? "Price on Request" 
    : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(rawPrice)

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-[1400px] px-4 pt-10">
        <Link href="/" className="group mb-10 inline-flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground">
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Collections
        </Link>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <section className="lg:col-span-7">
            <ProductGallery images={product.images} />
          </section>

          <section className="flex flex-col lg:col-span-5">
            <div className="mb-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{product.category}</span>
              <h1 className="text-4xl font-black lg:text-6xl">{product.name}</h1>
              <p className="text-3xl font-light">{displayPrice}</p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="my-12 grid grid-cols-3 gap-4 border-y py-10">
              <div className="flex flex-col items-center gap-2 text-center text-[10px] font-bold uppercase">
                <Truck className="h-6 w-6" /> <span>Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center text-[10px] font-bold uppercase border-x">
                <Shield className="h-6 w-6" /> <span>Secure Payment</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center text-[10px] font-bold uppercase">
                <RotateCcw className="h-6 w-6" /> <span>30-Day Returns</span>
              </div>
            </div>

            <button className="w-full rounded-full bg-black py-6 text-white font-bold hover:scale-[1.01] transition-transform">
              Add to Cart — {displayPrice}
            </button>
          </section>
        </div>
      </div>
    </main>
  )
}
