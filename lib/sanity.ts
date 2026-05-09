import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

// ✅ Environment variable checks
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.warn("⚠️ Missing NEXT_PUBLIC_SANITY_PROJECT_ID")
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  console.warn("⚠️ Missing NEXT_PUBLIC_SANITY_DATASET")
}

// ✅ Sanity client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
})

// ✅ Image builder
const builder = imageUrlBuilder(client)

// ✅ Helper function for images
export function urlFor(source: any) {
  return builder.image(source)
}
