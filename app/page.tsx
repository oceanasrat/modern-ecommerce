import { getProducts } from "@/lib/queries"
import ProductCard from "@/components/products/ProductCard"
import SearchBar from "@/components/products/SearchBar"
import { client } from "@/lib/sanity"
import Link from "next/link"

// Force fresh data on the homepage
export const revalidate = 0;

export default async function HomePage() {
  const products = await getProducts()

  const banners = await client.fetch(
    `*[_type == "promoBanner"]{
      _id,
      title,
      subtitle,
      "image": image.asset->url
    }`,
    {},
    { cache: "no-store" }
  )

  // ✅ SAFE NORMALIZER
  const normalize = (product: any) => {
    // 🚨 FIX: Safely extract the slug string if Sanity returns a slug object
    const actualSlug = typeof product?.slug === 'object' 
      ? product.slug.current 
      : product?.slug

    const safeId = actualSlug || product?._id || "missing-id"

    return {
      id: safeId,
      _id: product?._id || safeId,
      slug: actualSlug || safeId,
      name: product?.name || "Unnamed Product",
      price: typeof product?.price === "number" ? product.price : 0,
      image: typeof product?.image === "string" ? product.image : "/placeholder.png",
      category: product?.category || "Premium",
      rating: typeof product?.rating === "number" ? product.rating : 4.8,
      reviews: typeof product?.reviews === "number" ? product.reviews : 0,
      isBestSeller: Boolean(product?.isBestSeller),
      stock: typeof product?.stock === "number" ? product.stock : 0,
    }
  }

  // ✅ NORMALIZED PRODUCTS
  const normalizedProducts = products ? products.map(normalize) : []

  // ✅ FILTER NORMALIZED PRODUCTS
  const bestSellers = normalizedProducts.filter((p: any) => p.isBestSeller)
  const pet = normalizedProducts.filter((p: any) => p.category === "pet")
  const beauty = normalizedProducts.filter((p: any) => p.category === "beauty")
  const kitchen = normalizedProducts.filter((p: any) => p.category === "kitchen")
  const health = normalizedProducts.filter((p: any) => p.category === "health")

  return (
    <main className="container mx-auto px-6 py-12 space-y-16">

      {/* HERO BANNER */}
      {banners?.length > 0 && (
        <section className="relative w-full h-[450px] md:h-[600px] rounded-2xl overflow-hidden">
          <img
            src={banners.image || "/placeholder.png"}
            alt={banners.title || "Banner"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-6">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              {banners.title}
            </h2>
            <p className="text-lg md:text-xl max-w-xl mb-6">
              {banners.subtitle}
            </p>
            <a
              href="#products"
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold transition-transform hover:scale-105"
            >
              Shop Now
            </a>
          </div>
        </section>
      )}

      {/* TITLE */}
      <section>
        <h1 className="text-4xl md:text-6xl font-bold text-center tracking-tight">
          Ocean Global Ventures
        </h1>
      </section>

      {/* CATEGORY TILES */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Link href="/category/pet" className="rounded-xl border p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 bg-card">
          <span className="text-3xl">🐶</span>
          <p className="mt-2 font-semibold">Pet</p>
        </Link>
        <Link href="/category/beauty" className="rounded-xl border p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 bg-card">
          <span className="text-3xl">💄</span>
          <p className="mt-2 font-semibold">Beauty</p>
        </Link>
        <Link href="/category/kitchen" className="rounded-xl border p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 bg-card">
          <span className="text-3xl">🍳</span>
          <p className="mt-2 font-semibold">Kitchen</p>
        </Link>
        <Link href="/category/health" className="rounded-xl border p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 bg-card">
          <span className="text-3xl">💊</span>
          <p className="mt-2 font-semibold">Health</p>
        </Link>
        <Link href="/category/electronics" className="rounded-xl border p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 bg-card">
          <span className="text-3xl">💻</span>
          <p className="mt-2 font-semibold">Electronics</p>
        </Link>
      </section>

      {/* SEARCH */}
      <SearchBar products={normalizedProducts} />

      {/* BEST SELLERS */}
      {bestSellers.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">🔥 Best Sellers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {bestSellers.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* PET */}
      {pet.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">🐶 Pet Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pet.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* BEAUTY */}
      {beauty.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">💄 Beauty</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {beauty.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* KITCHEN */}
      {kitchen.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">🍳 Kitchen</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {kitchen.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* HEALTH */}
      {health.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">💊 Health & Wellness</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {health.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ALL PRODUCTS */}
      <section id="products">
        <h2 className="text-2xl font-bold mb-6">All Products</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {normalizedProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </main>
  )
}
