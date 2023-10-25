// TODO: link to eventOption

import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { eventOptions } from "./event";

// TODO: link to user
export const votes = pgTable("t3turbo_vote", {
  credits: integer("credits").default(0),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
  optionId: uuid("option_id").notNull(),
});

export const voteRelations = relations(votes, ({ one }) => ({
  option: one(eventOptions, {
    relationName: "votes",
    fields: [votes.optionId],
    references: [eventOptions.id],
  }),
}));
