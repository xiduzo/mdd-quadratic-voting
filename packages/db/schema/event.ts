import { relations } from "drizzle-orm";
import { date, integer, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { votes } from "./vote";

export const events = pgTable("event", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
  createdBy: text("created_by").notNull(),
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

export const eventOptionRelations = relations(
  eventOptions,
  ({ one, many }) => ({
    event: one(events, {
      fields: [eventOptions.eventId],
      references: [events.id],
    }),
    votes: many(votes, {
      relationName: "votes",
    }),
  }),
);
