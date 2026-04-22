import { getProducts } from "../../lib/queries"

// ✅ GET ALL PRODUCTS
export async function getProducts() {
  const products = await client.fetch(
    `*[_type == "product"]{
      _id,
      name,
      price,
      description,
      "image": images[0].asset->url,
      "images": images[].asset->url,
      category,
      rating,
      reviews,
      isBestSeller,
      stock
    }`,
    {},
    { cache: "no-store" }
  )

  return products.map((p: any) => ({
    ...p,
    images: Array.isArray(p.images)
      ? p.images.filter(Boolean)
      : [],
  }))
}

// ✅ GET SINGLE PRODUCT
export async function getProduct(id: string) {
  const product = await client.fetch(
    `*[_type == "product" && _id == $id][0]{
      _id,
      name,
      price,
      description,
      "images": images[].asset->url,
      category,
      rating,
      reviews,
      isBestSeller,
      stock
    }`,
    { id },
    { cache: "no-store" }
  )

  if (!product) return null

  return {
    ...product,
    images: Array.isArray(product.images)
      ? product.images.filter(Boolean)
      : [],
  }
}
