import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  dbCredentials: {
    url: "persist/db.sqlite",
  },
  schema: "./src/db/schema.ts",
});
