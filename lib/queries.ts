import { client } from "./sanity"

/** ✅ GET ALL PRODUCTS (Fail-safe for images) **/
export async function getProducts() {
  return client.fetch(
    `*[_type == "product"]{
      _id,
      name,
      "price": coalesce(price, 0),
      description,
      "image": coalesce(image.asset->url, images.asset->url, ""),
      "category": category->name,
      "categorySlug": category->slug.current,
      rating,
      isBestSeller
    }`,
    {},
    { cache: "no-store" }
  )
}

/** ✅ GET SINGLE PRODUCT **/
export async function getProduct(id: string) {
  const product = await client.fetch(
    `*[_type == "product" && _id == $id]{
      _id,
      name,
      "price": coalesce(price, 0),
      description,
      "image": image.asset->url,
      "images": images[].asset->url,
      "category": category->name,
      rating,
      stock
    }`,
    { id },
    { cache: "no-store" }
  )

  if (!product) return null

  // Ensure images is always an array, even if empty
  const allImages = []
  if (product.image) allImages.push(product.image)
  if (product.images) allImages.push(...product.images)

  return {
    ...product,
    images: allImages.length > 0 ? allImages : ["/placeholder.png"]
  }
}

/** ✅ GET PRODUCTS BY CATEGORY **/
export async function getProductsByCategory(slug: string) {
  return await client.fetch(
    `*[_type == "product" && category->slug.current == $slug] {
      _id,
      name,
      "image": coalesce(image.asset->url, images.asset->url, ""),
      "price": coalesce(price, 0),
      "category": category->name,
      isBestSeller,
      rating
    }`,
    { slug },
    { cache: "no-store" }
  )
}

/** ✅ GET CATEGORY DETAILS **/
export async function getCategory(slug: string) {
  return await client.fetch(
    `*[_type == "category" && slug.current == $slug] {
      name,
      description
    }`,
    { slug },
    { cache: "no-store" }
  )
}
