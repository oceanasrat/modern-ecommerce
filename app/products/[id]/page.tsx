import { notFound } from "next/navigation"
import { getProduct } from "@/lib/queries"
import ProductGallery from "@/components/products/ProductGallery"
import AddToCartSticky from "@/components/products/AddToCartSticky"

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {

  const { id } = await params

  const product = await getProduct(id)

  if (!product) {
    return notFound()
  }

  return (
    <main className="container mx-auto px-6 py-16">

      <div className="grid md:grid-cols-2 gap-10">

        <ProductGallery images={product.images} />

        <div>

          <h1 className="text-4xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-2xl font-semibold mb-6">
            ${product.price}
          </p>

          <p className="text-muted-foreground mb-8">
            {product.description}
          </p>

          <AddToCartSticky product={product} />

        </div>

      </div>

    </main>
  )
}