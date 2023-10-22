import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as auth from "./schema/auth";
import * as event from "./schema/event";
import * as post from "./schema/post";
import * as vote from "./schema/vote";

export const schema = { ...auth, ...post, ...event, ...vote };

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";
export * from "drizzle-zod";

// export const db = drizzle(
//   new Client({
//     url: process.env.DATABASE_URL,
//   }).connection(),
//   { schema },
// );

export const db = drizzle(sql, { schema });
