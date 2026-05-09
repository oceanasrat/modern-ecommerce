import { client } from "./sanity"

/** ✅ GET ALL PRODUCTS **/
export async function getProducts() {
  try {
    return await client.fetch(
      `*[_type == "product"]{
        _id,
        "slug": slug.current,
        name,
        "price": coalesce(price, 0),
        "image": images.asset->url,
        category,
        rating,
        isBestSeller
      }`,
      {},
      { cache: "no-store" }
    )
  } catch (error) {
    console.error("Sanity Fetch Error:", error)
    return []
  }
}

/** ✅ GET SINGLE PRODUCT **/
export async function getProduct(identifier: string) {
  try {
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
      images: Array.isArray(product.images) ? product.images : []
    }
  } catch (error) {
    return null
  }
}

/** ✅ GET PRODUCTS BY CATEGORY **/
export async function getProductsByCategory(categoryName: string) {
  try {
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
  } catch (error) {
    return []
  }
}
