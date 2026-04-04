const order = {
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "stripeId",
      title: "Stripe Session ID",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: "amount",
      title: "Total Amount",
      type: "number",
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Paid", value: "paid" },
          { title: "Pending", value: "pending" },
          { title: "Failed", value: "failed" },
        ],
        layout: "radio",
      },
      initialValue: "paid",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "productId",
              title: "Product ID",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "name",
              title: "Product Name",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "price",
              title: "Price",
              type: "number",
              validation: (Rule: any) => Rule.required().min(0),
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
              validation: (Rule: any) => Rule.required().min(1),
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "quantity",
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "customerEmail",
      subtitle: "stripeId",
      amount: "amount",
      status: "status",
    },
    prepare(selection: any) {
      const { title, subtitle, amount, status } = selection
      return {
        title: title || "Order",
        subtitle: `${subtitle || ""} • $${amount ?? 0} • ${status || "unknown"}`,
      }
    },
  },
}

export default order
