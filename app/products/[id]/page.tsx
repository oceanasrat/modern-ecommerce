import { notFound } from "next/navigation"
import Link from "next/link"
import { getProduct } from "@/lib/queries"
import ProductGallery from "@/components/products/ProductGallery"
import { ChevronLeft, Truck, Shield, RotateCcw } from "lucide-react"

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params

  if (!id || id === "undefined") return notFound()
  const product = await getProduct(id)
  if (!product) return notFound()

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-[1400px] px-4 pt-8 sm:px-6 lg:px-8">
        
        {/* DISCREET BREADCRUMB */}
        <Link 
          href="/" 
          className="group mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back
        </Link>

        {/* ASYMMETRIC GRID LAYOUT */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          
          {/* LEFT COLUMN: STICKY GALLERY (7 Columns wide) */}
          <section className="lg:sticky lg:top-24 lg:col-span-7">
            <ProductGallery images={product.images || [product.image]} />
          </section>

          {/* RIGHT COLUMN: SCROLLING INFO (5 Columns wide) */}
          <section className="flex flex-col lg:col-span-5 lg:py-12">
            
            <div className="mb-6">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {product.category || "Ocean Global Exclusive"}
              </h2>
              <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {product.name}
              </h1>
              <p className="mt-4 text-3xl font-light text-foreground">
                ${Number(product.price).toFixed(2)}
              </p>
            </div>

            <div className="prose prose-zinc mt-8 text-base leading-relaxed text-muted-foreground dark:prose-invert">
              <p>{product.description || "Premium quality meets everyday functionality. Designed to elevate your standard of living."}</p>
            </div>

            {/* TRUST ICON GRID */}
            <div className="my-10 grid grid-cols-3 gap-4 border-y border-zinc-200 py-8 dark:border-zinc-800">
              <div className="flex flex-col items-center gap-2 text-center">
                <Truck className="h-6 w-6 text-foreground" strokeWidth={1.5} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Shield className="h-6 w-6 text-foreground" strokeWidth={1.5} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Secure Checkout</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <RotateCcw className="h-6 w-6 text-foreground" strokeWidth={1.5} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">30-Day Returns</span>
              </div>
            </div>

            {/* ADD TO CART ACTION AREA */}
            <div className="mt-auto">
              <button className="flex w-full items-center justify-center rounded-full bg-foreground px-8 py-5 text-base font-bold text-background transition-transform hover:scale-[1.02] active:scale-[0.98]">
                Add to Cart — ${Number(product.price).toFixed(2)}
              </button>
            </div>

          </section>
        </div>
      </div>
    </main>
  )
}
