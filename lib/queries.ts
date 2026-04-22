import { client } from "@/lib/sanity"

// ✅ GET ALL PRODUCTS
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

  // ✅ SAFETY FIX (IMPORTANT)
  return {
    ...product,
    images: Array.isArray(product?.images)
      ? product.images.filter(Boolean)
      : [],
  }
}

// ✅ GET SINGLE PRODUCT
export async function getProduct(id: string) {
  return client.fetch(
    `*[_type == "product" && _id == $id][0]{
      _id,
      name,
      price,
      description,
      "images": images[].asset->url,

      // 🔥 NEW
      category,

      rating,
      reviews,
      isBestSeller,
      stock
    }`,
    { id },
    { cache: "no-store" }
  )
}
