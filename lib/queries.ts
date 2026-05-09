import { client } from "./sanity"

/** ✅ GET ALL PRODUCTS **/
export async function getProducts() {
  return await client.fetch(
    `*[_type == "product"]{
      _id,
      "slug": slug.current,
      name,
      "price": coalesce(price, 0),
      description,
      "image": images.asset->url,
      category,
      rating,
      isBestSeller
    }`,
    {},
    { cache: "no-store" }
  )
}

/** ✅ GET SINGLE PRODUCT **/
export async function getProduct(identifier: string) {
  // Use identifier to check both _id and slug.current
  const product = await client.fetch(
    `*[_type == "product" && (_id == $identifier || slug.current == $identifier)]{
      _id,
      "slug": slug.current,
      name,
      "price": coalesce(price, 0),
      description,
      "images": images[].asset->url,
      category,
      rating,
      stock,
      isBestSeller
    }`,
    { identifier },
    { cache: "no-store" }
  )

  if (!product) return null

  return {
    ...product,
    images: Array.isArray(product.images)
      ? product.images.filter((img: any) => typeof img === "string")
      : [],
  }
}

/** ✅ GET PRODUCTS BY CATEGORY **/
export async function getProductsByCategory(categoryName: string) {
  return await client.fetch(
    `*[_type == "product" && category == $categoryName]{
      _id,
      "slug": slug.current,
      name,
      "image": images.asset->url,
      "price": coalesce(price, 0),
      category,
      isBestSeller,
      rating
    }`,
    { categoryName },
    { cache: "no-store" }
  )
}

/** ✅ GET CATEGORY DETAILS **/
export async function getCategory(slug: string) {
  const name = slug
    ? slug.charAt(0).toUpperCase() + slug.slice(1)
    : "Collection"

  return {
    name,
    description: `Explore our premium collection of ${name} products.`,
  }
}
