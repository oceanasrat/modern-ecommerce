import { client } from "@/lib/sanity"

// ✅ GET ALL PRODUCTS FROM SANITY
export async function getProducts() {
  return client.fetch(`*[_type == "product"]{
    _id,
    "id": _id,
    name,
    price,
    description,

    // -------------------------
    // IMAGE (SAFE FORMAT)
    // -------------------------
    "image": images[0].asset->url,

    // -------------------------
    // NEW (Retail OS fields)
    // -------------------------
    sku,
    category
  }`)
}

// ✅ GET SINGLE PRODUCT
export async function getProduct(id: string) {
  return client.fetch(
    `*[_type == "product" && _id == $id][0]{
      _id,
      "id": _id,
      name,
      price,
      description,

      // -------------------------
      // IMAGES ARRAY (SAFE)
      // -------------------------
      "images": images[].asset->url,

      // -------------------------
      // NEW (Retail OS fields)
      // -------------------------
      sku,
      category
    }`,
    { id }
  )
}
