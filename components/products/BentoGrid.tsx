import ProductCard from "./ProductCard"

export default function BentoGrid({ products }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

      {/* Large feature product */}
      <div className="md:col-span-2 md:row-span-2">
        <ProductCard product={products[0]} />
      </div>

      {/* smaller products */}
      <ProductCard product={products[1]} />
      <ProductCard product={products[2]} />

    </div>
  )
}