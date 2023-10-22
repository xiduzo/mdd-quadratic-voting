// TODO: link to eventOption

import { relations } from "drizzle-orm";
import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { eventOptions } from "./event";

// TODO: link to user
export const votes = pgTable("event_vote", {
  credits: integer("credits").default(0),
  by: uuid("by").notNull(),
  name: varchar("name").default("unknown"),
  optionId: uuid("option_id").notNull(),
});

export const voteRelations = relations(votes, ({ one }) => ({
  option: one(eventOptions, {
    relationName: "votes",
    fields: [votes.optionId],
    references: [eventOptions.id],
  }),
}));
