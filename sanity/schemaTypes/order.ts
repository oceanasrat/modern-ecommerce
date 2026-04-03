const order = {
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "stripeId",
      title: "Stripe Session ID",
      type: "string",
    },
    {
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
    },
    {
      name: "amount",
      title: "Total Amount",
      type: "number",
    },
    {
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: ["paid", "pending", "failed"],
      },
    },
    {
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string" },
            { name: "price", type: "number" },
            { name: "quantity", type: "number" },
          ],
        },
      ],
    },
  ],
}

export default order