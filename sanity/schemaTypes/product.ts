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

    // 🆕 CATEGORY (IMPORTANT)
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Pet", value: "pet" },
          { title: "Beauty", value: "beauty" },
          { title: "Kitchen", value: "kitchen" },
          { title: "Electronics", value: "electronics" },
        ],
        layout: "dropdown"
      }
    },

    // ⭐ Rating
    {
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule: any) => Rule.min(0).max(5),
      initialValue: 4.5
    },

    // 💬 Reviews
    {
      name: "reviews",
      title: "Reviews Count",
      type: "number",
      initialValue: 120
    },

    // 🔥 Best Seller
    {
      name: "isBestSeller",
      title: "Best Seller",
      type: "boolean",
      initialValue: false
    },

    // ⏳ Stock
    {
      name: "stock",
      title: "Stock Quantity",
      type: "number",
      initialValue: 10
    }
  ]
}
