import { client } from "./sanity"

/** ✅ GET ALL PRODUCTS **/
export async function getProducts() {
  return client.fetch(
    `*[_type == "product"]{
      _id,
      name,
      "price": coalesce(price, 0),
      description,
      "image": coalesce(image.asset->url, images.asset->url, ""),
      "category": category->name,
      rating,
      isBestSeller
    }`,
    {},
    { cache: "no-store" }
  )
}

/** ✅ GET SINGLE PRODUCT **/
export async function getProduct(id: string) {
  // 🚨 CRITICAL: Added back so it returns one product, not an array!
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

  // Combines single image and array into one clean list for the gallery
  const allImages: string[] = []
  
  if (product.image) {
    allImages.push(product.image)
  }
  
  if (product.images && Array.isArray(product.images)) {
    // 🚨 CRITICAL: Added (img: any) to fix the Vercel build error!
    const validImages = product.images.filter((img: any) => typeof img === 'string')
    allImages.push(...validImages)
  }

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
  // 🚨 CRITICAL: Added back so it returns one category, not an array!
  return await client.fetch(
    `*[_type == "category" && slug.current == $slug] {
      name,
      description
    }`,
    { slug },
    { cache: "no-store" }
  )
}
