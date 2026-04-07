import { getProducts } from "@/lib/queries"
import ProductCard from "@/components/products/ProductCard"
import SearchBar from "@/components/products/SearchBar"
import { client } from "@/lib/sanity" // ✅ NEW

export default async function HomePage() {
  const products = await getProducts()

  // ✅ NEW: Fetch promo banner
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

  return (
    <main className="container mx-auto px-6 py-16">

      {/* ✅ NEW: Promo Banner */}
      {banner && (
        <div className="mb-12 rounded-xl overflow-hidden relative">
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-[300px] object-cover rounded-xl"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center p-6">
            <h2 className="text-4xl font-bold mb-2">
              {banner.title}
            </h2>
            <p className="text-lg">
              {banner.subtitle}
            </p>
          </div>
        </div>
      )}

      <h1 className="text-6xl font-bold mb-10">
        Ocean Global Ventures
      </h1>

      <SearchBar products={products} />

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <ProductCard
            key={product._id}
            product={{
              id: product._id,
              name: product.name,
              price: product.price,
              image: product.image
            }}
          />
        ))}
      </div>

    </main>
  )
}
