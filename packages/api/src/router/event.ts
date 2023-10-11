import { z } from "zod";

import type { Placeholder } from "@acme/db";
import { createInsertSchema, createSelectSchema, eq, schema } from "@acme/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

const createEventSchema = z.object({
  event: createInsertSchema(schema.events),
  options: z.array(
    createInsertSchema(schema.eventOptions, {
      eventId: z.string().optional(),
    }),
  ),
});

export const eventRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.events.findMany();
  }),
  byId: publicProcedure
    .input(createSelectSchema(schema.events))
    .query(({ ctx, input }) => {
      return ctx.db.query.events.findFirst({
        where: eq(schema.events.id, input.id),
        with: {
          options: true,
        },
      });
    }),
  create: publicProcedure
    .input(createEventSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.transaction(async (trx) => {
        const event = await trx
          .insert(schema.events)
          .values(input.event)
          .returning();

        const firstEvent = event[0];

        if (!firstEvent) return trx.rollback();

        const options = input.options.map((option) => ({
          ...option,
          eventId: firstEvent.id as unknown as Placeholder<string, unknown>,
        }));

        try {
          return trx.insert(schema.eventOptions).values(options);
        } catch {
          return trx.rollback();
        }
      });
    }),
  delete: publicProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.post).where(eq(schema.post.id, input));
  }),
});

export const optionRouter = createTRPCRouter({
  create: publicProcedure
    .input(createInsertSchema(schema.eventOptions))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(schema.eventOptions).values(input);
    }),
  delete: publicProcedure
    .input(createSelectSchema(schema.eventOptions))
    .mutation(({ ctx, input }) => {
      return ctx.db
        .delete(schema.eventOptions)
        .where(eq(schema.eventOptions.id, input.id));
    }),
});
