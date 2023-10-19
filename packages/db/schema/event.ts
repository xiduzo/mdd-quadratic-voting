import { relations } from "drizzle-orm";
import { date, integer, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";

export const events = pgTable("event", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
  secret: uuid("secret").defaultRandom(),
  title: text("name").notNull(),
  description: text("description").notNull(),
  credits: integer("credits").default(100),
  imageUri: text("image_uri").notNull(),
  startDate: date("start_date"),
  endDate: date("end_date"),
});

export const eventRelations = relations(events, ({ many }) => ({
  options: many(eventOptions),
}));

export const eventOptions = pgTable("event_option", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
});

export const eventOptionRelations = relations(eventOptions, ({ one }) => ({
  event: one(events, {
    fields: [eventOptions.eventId],
    references: [events.id],
  }),
}));

// TODO: link to eventOption
// TODO: link to user
export const votes = pgTable("event_vote", {
  credits: integer("credits").default(0),
});

// export const voteRelations = relations(votes, ({ one }) => ({
//     user: one(users, {

//     })
// }))
