import { Client } from "pg";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";

import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PW,
  port: parseInt(process.env.PG_PORT!),
  database: "dummy_rest",
});

client.connect();
export const db = drizzle(client, { schema });
