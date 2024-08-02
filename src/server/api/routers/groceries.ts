import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const groceriesRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({ shoppingListId: z.coerce.number(), name: z.string().min(1) }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.groceries.create({
        data: {
          name: input.name,
          shoppingListId: input.shoppingListId,
        },
      });
    }),

  getAll: publicProcedure
    .input(
      z.object({
        shoppingListId: z.coerce.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const groceries = await ctx.db.groceries.findMany({
        orderBy: { createdAt: "asc" },
        where: {
          shoppingListId: {
            equals: input.shoppingListId,
          },
        },
      });

      return groceries;
    }),

  archive: publicProcedure
    .input(
      z.object({
        id: z.coerce.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      await ctx.db.groceries.update({
        where: { id },
        data: { archived: true },
      });

      return true;
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.coerce.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      await ctx.db.groceries.delete({
        where: { id },
      });

      return true;
    }),
});
