import { getProducts } from "@/lib/queries"
import ProductCard from "@/components/products/ProductCard"
import SearchBar from "@/components/products/SearchBar"
import { client } from "@/lib/sanity"
import Link from "next/link"

// Force fresh data on the homepage
export const revalidate = 0;

export default async function HomePage() {
  // ✅ 1. Safe Data Fetching
  let products = [];
  let banners = [];

  try {
    const [fetchedProducts, fetchedBanners] = await Promise.all([
      getProducts(),
      client.fetch(
        `*[_type == "promoBanner"]{
          _id,
          title,
          subtitle,
          "image": image.asset->url
        }`,
        {},
        { cache: "no-store" }
      )
    ]);
    products = fetchedProducts || [];
    banners = fetchedBanners || [];
  } catch (error) {
    console.error("Home Page Fetch Error:", error);
  }

  // ✅ 2. FIX: Get the first banner from the array
  const activeBanner = banners.length > 0 ? banners : null;

  // ✅ 3. SAFE NORMALIZER (Prevents $NaN and Broken Links)
  const normalize = (product: any) => {
    if (!product) return null;

    // Use the slug string, fallback to ID
    const safeId = product.slug || product._id || "missing-id";

    return {
      id: safeId,
      _id: product._id || safeId,
      slug: safeId,
      name: product.name || "Premium Product",
      price: Number(product.price) || 0, // Force number to stop $NaN
      image: product.image || "/placeholder.png",
      category: product.category || "General",
      rating: Number(product.rating) || 4.8,
      isBestSeller: Boolean(product.isBestSeller),
    }
  }

  // ✅ 4. PROCESS DATA
  const normalizedProducts = products.map(normalize).filter(Boolean);
  
  const bestSellers = normalizedProducts.filter((p: any) => p.isBestSeller);
  const categories = ["pet", "beauty", "kitchen", "health"];
  
  // Group products by category for easy rendering
  const productGroups = categories.reduce((acc: any, cat) => {
    acc[cat] = normalizedProducts.filter((p: any) => p.category === cat);
    return acc;
  }, {});

  return (
    <main className="container mx-auto px-6 py-12 space-y-16">

      {/* ✅ HERO BANNER FIX: Corrected array access */}
      {activeBanner && (
        <section className="relative w-full h-[450px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={activeBanner.image || "/placeholder.png"}
            alt={activeBanner.title || "Banner"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-6">
            <h2 className="text-4xl md:text-7xl font-black mb-4 tracking-tighter uppercase">
              {activeBanner.title}
            </h2>
            <p className="text-lg md:text-xl max-w-xl mb-8 font-light">
              {activeBanner.subtitle}
            </p>
            <a
              href="#products"
              className="bg-white text-black px-10 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
            >
              Shop the Collection
            </a>
          </div>
        </section>
      )}

      {/* BRAND TITLE */}
      <section className="pt-10">
        <h1 className="text-5xl md:text-8xl font-black text-center tracking-tighter uppercase">
          Ocean Global
        </h1>
      </section>

      {/* CATEGORY TILES */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { slug: "pet", icon: "🐶", label: "Pet" },
          { slug: "beauty", icon: "💄", label: "Beauty" },
          { slug: "kitchen", icon: "🍳", label: "Kitchen" },
          { slug: "health", icon: "💊", label: "Health" },
        ].map((cat) => (
          <Link 
            key={cat.slug} 
            href={`/category/${cat.slug}`} 
            className="group rounded-2xl border p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1 bg-card dark:border-zinc-800"
          >
            <span className="text-4xl block transition-transform group-hover:scale-110">{cat.icon}</span>
            <p className="mt-4 font-bold uppercase tracking-widest text-xs">{cat.label}</p>
          </Link>
        ))}
      </section>

      {/* SEARCH BAR */}
      <div className="max-w-2xl mx-auto">
        <SearchBar products={normalizedProducts} />
      </div>

      {/* BEST SELLERS SECTION */}
      {bestSellers.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black uppercase tracking-tight">🔥 Best Sellers</h2>
            <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800 ml-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers.slice(0, 3).map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* DYNAMIC CATEGORY SECTIONS */}
      {categories.map((cat) => {
        const groupProducts = productGroups[cat];
        if (groupProducts.length === 0) return null;

        return (
          <section key={cat}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black uppercase tracking-tight">
                {cat === 'pet' ? '🐶' : cat === 'beauty' ? '💄' : cat === 'kitchen' ? '🍳' : '💊'} {cat}
              </h2>
              <Link href={`/category/${cat}`} className="text-xs font-bold uppercase underline underline-offset-4">View All</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {groupProducts.slice(0, 3).map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        );
      })}

      {/* ALL PRODUCTS GRID */}
      <section id="products" className="pt-20 border-t">
        <h2 className="text-2xl font-black mb-10 uppercase tracking-widest text-center">The Full Inventory</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {normalizedProducts.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

    </main>
  )
}
