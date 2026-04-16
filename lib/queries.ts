import { client } from "@/lib/sanity"

// ✅ GET ALL PRODUCTS
export async function getProducts() {
  return client.fetch(
    `*[_type == "product"]{
      _id,
      name,
      price,
      description,
      "image": images[0].asset->url,

      // 🔥 NEW
      category,

      rating,
      reviews,
      isBestSeller,
      stock
    }`,
    {},
    { cache: "no-store" }
  )
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
