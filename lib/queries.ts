Import { createClient } from "@sanity/client"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true,
}) and import { client } from "@/lib/sanity"

// ✅ GET ALL PRODUCTS
export async function getProducts() {
  return client.fetch(
    `*[_type == "product"]{
      _id,
      name,
      price,
      description,
      "image": images[0].asset->url,
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

// ✅ GET SINGLE PRODUCT (MULTIPLE IMAGES SAFE)
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
      ? product.images.filter(
          (img: string) => typeof img === "string" && img.length > 0
        )
      : [],
  }
}
