import { client } from "@/lib/sanity"

<<<<<<< HEAD
// ✅ GET ALL PRODUCTS FROM SANITY
=======
>>>>>>> 54f665595f0584e34d3735dcffc40828abe7a77f
export async function getProducts() {
  return client.fetch(`*[_type == "product"]{
    _id,
    name,
    price,
    description,
    "image": images[0].asset->url
  }`)
}

<<<<<<< HEAD
// ✅ GET SINGLE PRODUCT
=======
>>>>>>> 54f665595f0584e34d3735dcffc40828abe7a77f
export async function getProduct(id: string) {
  return client.fetch(
    `*[_type == "product" && _id == $id][0]{
      _id,
      name,
      price,
      description,
      "images": images[].asset->url
    }`,
    { id }
  )
}