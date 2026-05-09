import { client } from "./sanity"

/** ✅ GET ALL PRODUCTS **/
export async function getProducts() {
  return client.fetch(
    `*[_type == "product"]{
      _id,
      name,
      price,
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
  // Added so it returns a single object, not an array
  const product = await client.fetch(
    `*[_type == "product" && _id == $id]{
      _id,
      name,
      price,
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
    // Ensures the gallery always has a valid array of image URLs
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
      price,
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
  // Since categories are just strings in your product schema, 
  // we generate the title from the URL slug
  return {
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    description: `Explore our premium collection of ${slug} products.`
  }
}
