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
    },

    // ⭐ Rating (0–5)
    {
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule: any) => Rule.min(0).max(5),
      initialValue: 4.5
    },

    // 💬 Number of reviews
    {
      name: "reviews",
      title: "Reviews Count",
      type: "number",
      initialValue: 120
    },

    // 🔥 Best Seller Badge
    {
      name: "isBestSeller",
      title: "Best Seller",
      type: "boolean",
      initialValue: false
    },

    // ⏳ Stock (inventory)
    {
      name: "stock",
      title: "Stock Quantity",
      type: "number",
      initialValue: 10
    }
  ]
}
