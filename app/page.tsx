import { getProducts } from "@/lib/queries"
import ProductCard from "@/components/products/ProductCard"
import SearchBar from "@/components/products/SearchBar"
import { client } from "@/lib/sanity"

export default async function HomePage() {
  const products = await getProducts()

  // ✅ Fetch ALL promo banners (live)
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

      {/* ✅ PROMO BANNERS */}
      {banners?.length === 1 && (
  <div className="mb-16 relative rounded-2xl overflow-hidden">
    <img
      src={banners[0].image}
      alt={banners[0].title}
      className="w-full h-[400px] md:h-[500px] object-cover"
    />

    <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-6">
      <h2 className="text-4xl md:text-6xl font-bold mb-4">
        {banners[0].title}
      </h2>
      <p className="text-lg md:text-xl max-w-xl">
        {banners[0].subtitle}
      </p>
    </div>
  </div>
)}

{banners?.length > 1 && (
  <div className="mb-12 flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
    {banners.map((banner: any) => (
      <div
        key={banner._id}
        className="min-w-[320px] snap-start rounded-xl overflow-hidden relative group"
      >
        <img
          src={banner.image}
          alt={banner.title}
          className="w-full h-[220px] object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center p-4">
          <h2 className="text-xl font-bold">
            {banner.title}
          </h2>
          <p className="text-sm">
            {banner.subtitle}
          </p>
        </div>
      </div>
    ))}
  </div>
)}

      {/* ✅ TITLE */}
      <h1 className="text-6xl font-bold mb-10">
        Ocean Global Ventures
      </h1>

      {/* ✅ SEARCH */}
      <SearchBar products={products} />

      {/* ✅ PRODUCTS GRID */}
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
