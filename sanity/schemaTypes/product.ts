export default {
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Product Name"
    },
    {
      name: "slug",
      type: "slug",
      options: { source: "name" }
    },
    {
      name: "price",
      type: "number",
      title: "Price"
    },
    {
      name: "description",
      type: "text",
      title: "Description"
    },
    {
      name: "images",
      type: "array",
      of: [{ type: "image" }]
    }
  ]
}