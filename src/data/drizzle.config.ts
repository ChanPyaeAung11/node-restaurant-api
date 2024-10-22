import { Config, defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  // need to write from src path
  schema: "src/data/schema.ts",
  out: "src/data/migration",
  dbCredentials: {
    host: process.env.PG_HOST!, // let ts know this wont be non-null or non-undefined
    user: process.env.PG_USER,
    password: process.env.PG_PW,
    port: parseInt(process.env.PG_PORT!),
    database: "dummy_rest",
    ssl: false,
  },
} satisfies Config);
