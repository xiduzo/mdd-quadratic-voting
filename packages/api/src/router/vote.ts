import { z } from "zod";

import { createInsertSchema, eq, inArray, schema } from "@acme/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const voteRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.array(
        createInsertSchema(schema.votes, {
          createdBy: z.undefined(),
        }),
      ),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.transaction(async (trx) => {
        await trx.delete(schema.votes).where(
          eq(schema.votes.createdBy, ctx.auth.userId) &&
            inArray(
              schema.votes.optionId,
              input.map((option) => option.optionId),
            ),
        );

        return trx.insert(schema.votes).values(
          input.map((item) => ({
            ...item,
            createdBy: ctx.auth.userId,
          })),
        );
      });
    }),
  byEventId: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.query.events.findFirst({
      where: eq(schema.events.id, input),
      columns: {},
      with: {
        options: {
          columns: {
            id: true,
          },
          with: {
            votes: {
              where: eq(schema.votes.createdBy, ctx.auth.userId),
            },
          },
        },
      },
    });
  }),
});
