import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const shoppingListRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({ name: z.string().min(1), description: z.string().min(1) }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.shoppingList.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const groceries = await ctx.db.shoppingList.findMany({
      orderBy: { createdAt: "asc" },
    });

    return groceries;
  }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.coerce.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      await ctx.db.shoppingList.delete({
        where: { id },
      });

      return true;
    }),
});
