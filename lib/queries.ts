import { client } from "./sanity"

/** ✅ GET ALL PRODUCTS **/
export async function getProducts() {
  return client.fetch(
    `*[_type == "product"]{
      _id,
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
export async function getProduct(id: string) {
  // 🚨 FIXED: Added to the query string so it returns ONE object
  const product = await client.fetch(
    `*[_type == "product" && _id == $id]{
      _id,
      name,
      "price": coalesce(price, 0),
      description,
      "images": images[].asset->url,
      category,
      rating,
      stock
    }`,
    { id },
    { cache: "no-store" }
  )

  if (!product) return null

  return {
    ...product,
    // Ensures images is always a clean array of strings
    images: Array.isArray(product.images) 
      ? product.images.filter((img: any) => typeof img === 'string') 
      : []
  }
}

/** ✅ GET PRODUCTS BY CATEGORY **/
export async function getProductsByCategory(categoryName: string) {
  // Matches the string value from your schema dropdown
  return await client.fetch(
    `*[_type == "product" && category == $categoryName] {
      _id,
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
  // Logic to capitalize the slug for the UI header
  const name = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Collection"
  
  return {
    name: name,
    description: `Explore our premium collection of ${name} products.`
  }
}
