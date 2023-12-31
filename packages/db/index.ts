import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as event from "./schema/event";
import * as vote from "./schema/vote";

export const schema = { ...event, ...vote };

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
