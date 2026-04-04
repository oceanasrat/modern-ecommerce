export default {
  name: "storeSettings",
  title: "Store Settings",
  type: "document",
  fields: [
    {
      name: "storeName",
      type: "string",
      title: "Store Name"
    },
    {
      name: "deliveryWindows",
      type: "array",
      title: "Delivery Time Slots",
      description: "Customers will choose one during checkout",
      of: [{ type: "string" }],
      options: {
        layout: "tags"
      }
    }
  ]
}
