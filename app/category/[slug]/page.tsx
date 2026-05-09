import { notFound } from "next/navigation"
import { getProductsByCategory, getCategory } from "@/lib/queries"
import ProductCard from "@/components/products/ProductCard"
import Link from "next/link"
import { ChevronLeft, LayoutGrid } from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: Props) {
  // ✅ FIX: In Next.js 15, params MUST be awaited to prevent 500 errors
  const { slug } = await params

  // ✅ Optimization: Fetch only the specific category and its products
  const [products, category] = await Promise.all([
    getProductsByCategory(slug),
    getCategory(slug),
  ])

  // If the category doesn't exist in Sanity, show the 404 page
  if (!category) {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-[1400px] px-4 pt-12 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION - "Super Nice" Aesthetic */}
        <div className="mb-16 flex flex-col items-start gap-4">
          <Link 
            href="/" 
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Shop
          </Link>
          
          <div className="flex w-full items-end justify-between border-b border-zinc-100 pb-8 dark:border-zinc-800">
            <div className="space-y-2">
              <h1 className="text-5xl font-black tracking-tighter sm:text-7xl uppercase">
                {category.name}
              </h1>
              <p className="max-w-xl text-lg font-medium text-muted-foreground">
                {category.description || `Explore our curated selection of premium ${category.name} essentials.`}
              </p>
            </div>
            
            <div className="hidden items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground lg:flex">
              <LayoutGrid className="h-4 w-4" />
              {products.length} Products Found
            </div>
          </div>
        </div>

        {/* PRODUCT GRID */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product: any) => (
              <ProductCard 
                key={product._id} 
                product={{
                  ...product,
                  id: product._id // Ensures the ID is passed correctly to the card
                }} 
              />
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-zinc-100 py-32 text-center dark:border-zinc-900">
            <div className="mb-6 rounded-full bg-zinc-50 p-6 dark:bg-zinc-900">
               <LayoutGrid className="h-10 w-10 text-zinc-300" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">No products found</h2>
            <p className="mt-2 text-muted-foreground">
              We are currently restocking the {category.name} collection.
            </p>
            <Link 
              href="/" 
              className="mt-8 rounded-full bg-foreground px-10 py-4 text-sm font-bold text-background transition-transform hover:scale-105 active:scale-95"
            >
              Discover Other Collections
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
