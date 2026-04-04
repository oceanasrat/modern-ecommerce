export default {
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    // -------------------------
    // CORE FIELDS (KEEP EXISTING)
    // -------------------------
    {
      name: "name",
      type: "string",
      title: "Product Name",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "price",
      type: "number",
      title: "Price",
      validation: (Rule: any) => Rule.required().min(0)
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

    // -------------------------
    // UNIVERSAL RETAIL FIELDS
    // -------------------------
    {
      name: "sku",
      type: "string",
      title: "SKU / Barcode",
      description: "Unique identifier (used for bulk import)",
      validation: (Rule: any) => Rule.required()
    },
    {
      name: "stock",
      type: "number",
      title: "Stock Quantity",
      initialValue: 0,
      validation: (Rule: any) => Rule.min(0)
    },
    {
      name: "category",
      type: "string",
      title: "Category",
      options: {
        list: [
          { title: "Fresh", value: "fresh" },
          { title: "Alcohol", value: "alcohol" },
          { title: "General", value: "general" }
        ],
        layout: "dropdown"
      },
      validation: (Rule: any) => Rule.required()
    },

    // -------------------------
    // CONDITIONAL FIELDS (ALCOHOL ONLY)
    // -------------------------
    {
      name: "abv",
      type: "number",
      title: "Alcohol % (ABV)",
      hidden: ({ document }: any) => document?.category !== "alcohol",
      validation: (Rule: any) =>
        Rule.custom((value: number, context: any) => {
          if (context.document?.category === "alcohol" && !value) {
            return "ABV is required for alcohol products";
          }
          return true;
        })
    },
    {
      name: "vintage",
      type: "string",
      title: "Vintage (Year)",
      hidden: ({ document }: any) => document?.category !== "alcohol"
    }
  ]
}