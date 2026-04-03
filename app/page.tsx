import { getProducts } from "@/lib/queries"
import ProductCard from "@/components/products/ProductCard"
import SearchBar from "@/components/products/SearchBar"

export default async function HomePage() {

  const products = await getProducts()

  return (
    <main className="container mx-auto px-6 py-16">

      <h1 className="text-6xl font-bold mb-10">
        OCEAN GLOBAL
      </h1>
      <SearchBar products={products} />
      <div className="grid md:grid-cols-3 gap-6">

        {products.map((product:any) => (
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