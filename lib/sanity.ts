import { createClient } from "@sanity/client"

// ✅ Debugging: This will help you see if your env variables are missing in the logs
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.warn("⚠️ Sanity Project ID is missing. Check your environment variables!")
}

export const client = createClient({
  // Use the exact names from your .env.local and Vercel settings
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your_actual_project_id_here",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  
  // Use a modern API version
  apiVersion: "2024-01-01",
  
  // 💡 Set useCdn to false while debugging to ensure you see the latest Sanity data immediately
  useCdn: false,
})
