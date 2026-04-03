export const structure = (S: any) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("product").title("Products"),
      S.documentTypeListItem("order").title("Orders"),
      S.documentTypeListItem("promoBanner").title("Promo Banners"),
    ])