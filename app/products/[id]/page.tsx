import { notFound } from "next/navigation"
import Link from "next/link"
import { getProduct } from "@/lib/queries"
import ProductGallery from "@/components/products/ProductGallery"
import { ChevronLeft, Truck, Shield, RotateCcw } from "lucide-react"

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
  // ✅ Next.js 15 requirement: Await the params
  const { id } = await params

  // Safety check for undefined IDs
  if (!id || id === "undefined") return notFound()
  
  const product = await getProduct(id)
  
  // If product not found in Sanity
  if (!product) return notFound()

  // ✅ $NaN Fix: Safely format price
  const rawPrice = Number(product.price)
  const formattedPrice = isNaN(rawPrice) ? "0.00" : rawPrice.toFixed(2)

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-[1400px] px-4 pt-10 sm:px-6 lg:px-8">
        
        <Link 
          href="/" 
          className="group mb-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Collections
        </Link>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-20">
          
          {/* LEFT: GALLERY */}
          <section className="lg:sticky lg:top-24 lg:col-span-7">
            <ProductGallery images={product.images} />
          </section>

          {/* RIGHT: CONTENT */}
          <section className="flex flex-col lg:col-span-5 lg:py-10">
            
            <div className="mb-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {product.category || "Exclusive"}
              </span>
              <h1 className="text-5xl font-black tracking-tighter text-foreground lg:text-6xl">
                {product.name}
              </h1>
              <p className="text-3xl font-light text-foreground/90">
                ${formattedPrice}
              </p>
            </div>

            <p className="text-lg leading-relaxed text-muted-foreground/90">
              {product.description || "Expertly crafted using the finest materials to ensure lasting quality and timeless style."}
            </p>

            {/* TRUST BADGES */}
            <div className="my-12 grid grid-cols-3 gap-4 border-y border-zinc-100 py-10 dark:border-zinc-800">
              <div className="flex flex-col items-center gap-3 text-center">
                <Truck className="h-6 w-6" strokeWidth={1} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-center border-x">
                <Shield className="h-6 w-6" strokeWidth={1} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-center">
                <RotateCcw className="h-6 w-6" strokeWidth={1} />
                <span className="text-[10px] font-bold uppercase tracking-widest">30-Day Returns</span>
              </div>
            </div>

            <button className="flex w-full items-center justify-center rounded-full bg-foreground px-8 py-6 text-base font-bold text-background transition-transform hover:scale-[1.02] active:scale-[0.98]">
              Add to Cart — ${formattedPrice}
            </button>

          </section>
        </div>
      </div>
    </main>
  )
}
