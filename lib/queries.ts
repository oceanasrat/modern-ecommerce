import { client } from "./sanity"

/** ✅ GET ALL PRODUCTS **/
export async function getProducts() {
  return await client.fetch(
    `*[_type == "product"]{
      _id,

      // ✅ Include slug
      "slug": slug.current,

      name,
      "price": coalesce(price, 0),
      description,

      // ✅ First image only
      "image": images[0].asset->url,

      category,
      rating,
      isBestSeller
    }`,
    {},
    { cache: "no-store" }
  )
}

/** ✅ GET SINGLE PRODUCT **/
export async function getProduct(slug: string) {
  // ✅ Fetch by slug instead of _id
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      _id,

      // ✅ Include slug
      "slug": slug.current,

      name,
      "price": coalesce(price, 0),
      description,

      // ✅ Get all image URLs
      "images": images[].asset->url,

      category,
      rating,
      stock
    }`,
    { slug },
    { cache: "no-store" }
  )

  if (!product) return null

  return {
    ...product,

    // ✅ Safety cleanup
    images: Array.isArray(product.images)
      ? product.images.filter(
          (img: any) =>
            typeof img === "string"
        )
      : [],
  }
}

/** ✅ GET PRODUCTS BY CATEGORY **/
export async function getProductsByCategory(
  categoryName: string
) {
  return await client.fetch(
    `*[_type == "product" && category == $categoryName]{
      _id,

      // ✅ Include slug
      "slug": slug.current,

      name,

      // ✅ First image only
      "image": images[0].asset->url,

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
    ? slug.charAt(0).toUpperCase() +
      slug.slice(1)
    : "Collection"

  return {
    name,
    description: `Explore our premium collection of ${name} products.`,
  }
}
