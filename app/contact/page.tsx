export default function ContactPage() {
  const contacts = [
    {
      title: "Procurement",
      email: "procurement@oceanglobalventuresllc.com",
      description: "Supplier onboarding, wholesale sourcing, and partnerships",
    },
    {
      title: "Customer Support",
      email: "info@oceanglobalventuresllc.com",
      description: "Order help, product questions, and general inquiries",
    },
    {
      title: "Sales",
      email: "sales@oceanglobalventuresllc.com",
      description: "Bulk orders, pricing, and business inquiries",
    },
    {
      title: "Wholesale",
      email: "wholesale@oceanglobalventuresllc.com",
      description: "Wholesale accounts and distribution partnerships",
    },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border bg-background shadow-sm">
        <div className="px-6 py-14 sm:px-10 lg:px-16">
          
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <span className="inline-flex items-center rounded-full border px-4 py-1 text-sm font-medium text-muted-foreground">
              Contact & Support
            </span>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Get in Touch
            </h1>

            <p className="text-base text-muted-foreground sm:text-lg">
              Reach out to the right department for faster response and support.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {contacts.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>

                <a
                  href={`mailto:${item.email}`}
                  className="mt-4 block text-sm font-medium text-primary hover:underline"
                >
                  {item.email}
                </a>
              </div>
            ))}
          </div>

          {/* Business Info */}
          <div className="mt-16 grid gap-6 md:grid-cols-3 text-center">
            <div className="rounded-2xl border p-6 shadow-sm">
              <h3 className="font-semibold text-lg">📞 Phone</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                (214) 251-9820
              </p>
            </div>

            <div className="rounded-2xl border p-6 shadow-sm">
              <h3 className="font-semibold text-lg">🌐 Website</h3>
              <a
                href="https://oceanglobalventuresllc.com"
                className="mt-2 block text-sm text-primary hover:underline"
              >
                oceanglobalventuresllc.com
              </a>
            </div>

            <div className="rounded-2xl border p-6 shadow-sm">
              <h3 className="font-semibold text-lg">📍 Address</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                393 S Barnes Dr <br />
                Garland, TX 75042
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-16 rounded-2xl bg-muted/40 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Ocean Global Ventures LLC is a registered U.S. business operating in
              retail and wholesale distribution, focused on delivering quality products
              and reliable service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}