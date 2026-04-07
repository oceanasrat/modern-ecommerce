import { client } from "@/lib/sanity"

// ✅ GET ALL PRODUCTS FROM SANITY
export async function getProducts() {
  return client.fetch(
    `*[_type == "product"]{
      _id,
      name,
      price,
      description,
      "image": images[0].asset->url
    }`,
    {},
    { cache: "no-store" } // ✅ NEW (disables caching)
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
      "images": images[].asset->url
    }`,
    { id },
    { cache: "no-store" } // ✅ NEW (disables caching)
  )
}
