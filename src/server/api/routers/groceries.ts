import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const groceriesRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.groceries.create({
        data: {
          name: input.name,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const groceries = await ctx.db.groceries.findMany({
      orderBy: { createdAt: "asc" },
    });

    return groceries;
  }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.groceries.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),
});
