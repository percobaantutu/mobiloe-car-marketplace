import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  out: "./drizzle/migrations",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_HM8pNqhDE2CA@ep-summer-sea-a8vvgzqz-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
  },
  verbose: true,
  strict: true,
});
