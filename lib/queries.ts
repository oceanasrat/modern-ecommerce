import { client } from "./sanity"

/**
 * ✅ GET ALL PRODUCTS
 * Used for the homepage grid.
 */
export async function getProducts() {
  return client.fetch(
    `*[_type == "product"]{
      _id,
      name,
      price,
      description,
      "image": images.asset->url,
      "category": category->name,
      rating,
      reviews,
      isBestSeller,
      stock
    }`,
    {},
    { cache: "no-store" }
  )
}

/**
 * ✅ GET SINGLE PRODUCT
 * Fetches full details and an array of all images for the gallery.
 */
export async function getProduct(id: string) {
  const product = await client.fetch(
    `*[_type == "product" && _id == $id]{
      _id,
      name,
      price,
      description,
      "images": images[].asset->url,
      "category": category->name,
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

/**
 * ✅ GET PRODUCTS BY CATEGORY
 * Fixes the 500 error by fetching products filtered by the category slug.
 */
export async function getProductsByCategory(slug: string) {
  const query = `*[_type == "product" && category->slug.current == $slug] {
    _id,
    name,
    "image": images.asset->url,
    price,
    "category": category->name,
    isBestSeller,
    rating,
    reviews
  }`
  
  return await client.fetch(query, { slug }, { cache: "no-store" })
}

/**
 * ✅ GET CATEGORY DETAILS
 * Fetches the name and description of a category for the category header.
 */
export async function getCategory(slug: string) {
  const query = `*[_type == "category" && slug.current == $slug] {
    name,
    description
  }`
  
  return await client.fetch(query, { slug }, { cache: "no-store" })
}
