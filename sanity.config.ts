import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"

import { schemaTypes } from "./sanity/schemaTypes"

export default defineConfig({
  name: "default",
  title: "Modern Ecommerce",

  projectId: "9nyxu0fy",
  dataset: "production",

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})