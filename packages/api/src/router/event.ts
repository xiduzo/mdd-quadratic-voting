import { del } from "@vercel/blob";
import { z } from "zod";

import type { Placeholder } from "@acme/db";
import {
  createInsertSchema,
  createSelectSchema,
  desc,
  eq,
  gt,
  inArray,
  schema,
} from "@acme/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const createEventSchema = z.object({
  event: createInsertSchema(schema.events, {
    createdBy: z.undefined(),
  }),
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
  latest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.events.findMany({
      limit: 3,
      orderBy: desc(schema.events.createdAt),
    });
  }),
  trending: publicProcedure.query(async ({ ctx }) => {
    const lastVotes = await ctx.db.query.votes.findMany({
      where: gt(
        schema.votes.createdAt,
        new Date(Date.now() - 1000 * 60 * 60 * 24),
      ),
      limit: 100,
      orderBy: desc(schema.votes.createdAt),
      columns: {
        optionId: true,
      },
    });

    const mostCommonOptionIds = lastVotes.reduce(
      (acc, vote) => {
        if (acc[vote.optionId]) {
          acc[vote.optionId] += 1;
        } else {
          acc[vote.optionId] = 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    const topTwoOptionIds = Object.entries(mostCommonOptionIds)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([id]) => id);

    console.log({ topTwoOptionIds });

    if (!topTwoOptionIds.length) return [];

    const options = await ctx.db.query.eventOptions.findMany({
      where: inArray(schema.eventOptions.id, topTwoOptionIds),
      columns: {
        eventId: true,
      },
    });

    const eventIds = options.map((option) => option.eventId);

    return ctx.db.query.events.findMany({
      where: inArray(schema.events.id, eventIds),
      orderBy: desc(schema.events.createdAt),
    });
  }),
  my: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.events.findMany({
      where: eq(schema.events.createdBy, ctx.auth.userId),
      orderBy: desc(schema.events.createdAt),
    });
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.query.events.findFirst({
      where: eq(schema.events.id, input),
      with: {
        options: true,
      },
    });
  }),
  create: protectedProcedure
    .input(createEventSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.transaction(async (trx) => {
        //TODO: image upload
        // console.log({ event: input.event.imageUri });
        // const blob = await put(
        //   `event-images/${input.event.title}/`,
        //   input.event.imageUri,
        //   { access: "public" },
        // );
        // console.log({ blob });
        const event = await trx
          .insert(schema.events)
          .values({
            ...input.event,
            createdBy: ctx.auth.userId,
          })
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
  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const event = await ctx.db.query.events.findFirst({
      where: eq(schema.events.id, input),
      columns: { imageUri: true },
    });

    if (event) await del(event.imageUri);

    return ctx.db.delete(schema.events).where(eq(schema.events.id, input));
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
