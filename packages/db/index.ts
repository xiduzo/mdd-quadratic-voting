import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as auth from "./schema/auth";
import * as post from "./schema/post";

export const schema = { ...auth, ...post };

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

// export const db = drizzle(
//   new Client({
//     url: process.env.DATABASE_URL,
//   }).connection(),
//   { schema },
// );

export const db = drizzle(sql, { schema });
