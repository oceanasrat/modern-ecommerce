import { getProducts } from "@/lib/queries"
import ProductCard from "@/components/products/ProductCard"
import SearchBar from "@/components/products/SearchBar"
import { client } from "@/lib/sanity"

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

  // 🔥 FILTER PRODUCTS BY CATEGORY
  const bestSellers = products.filter((p: any) => p.isBestSeller)
  const pet = products.filter((p: any) => p.category === "pet")
  const beauty = products.filter((p: any) => p.category === "beauty")
  const kitchen = products.filter((p: any) => p.category === "kitchen")

  return (
    <main className="container mx-auto px-6 py-12 space-y-16">

      {/* HERO BANNER */}
      {banners?.length === 1 && (
        <section className="relative w-full h-[450px] md:h-[600px] rounded-2xl overflow-hidden">
          <img src={banners[0].image} className="w-full h-full object-cover" />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-6">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              {banners[0].title}
            </h2>
            <p className="text-lg md:text-xl max-w-xl mb-6">
              {banners[0].subtitle}
            </p>
            <a href="#products" className="bg-white text-black px-6 py-3 rounded-lg font-semibold">
              Shop Now
            </a>
          </div>
        </section>
      )}

      {/* TITLE */}
      <section>
        <h1 className="text-4xl md:text-6xl font-bold text-center">
          Ocean Global Ventures
        </h1>
      </section>

      {/* SEARCH */}
      <SearchBar products={products} />

      {/* 🔥 BEST SELLERS */}
      {bestSellers.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">🔥 Best Sellers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {bestSellers.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 🐶 PET */}
      {pet.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">🐶 Pet Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pet.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 💄 BEAUTY */}
      {beauty.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">💄 Beauty</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {beauty.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 🍳 KITCHEN */}
      {kitchen.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">🍳 Kitchen</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {kitchen.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ALL PRODUCTS (KEEP ORIGINAL) */}
      <section id="products">
        <h2 className="text-2xl font-bold mb-6">All Products</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

    </main>
  )
}
