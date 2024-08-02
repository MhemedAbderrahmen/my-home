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
      where: { paid: false },
      orderBy: { createdAt: "asc" },
      include: {
        groceries: true,
      },
    });
    return groceries;
  }),

  getPaidLists: publicProcedure.query(async ({ ctx }) => {
    const groceries = await ctx.db.shoppingList.findMany({
      where: { paid: true },
      orderBy: { createdAt: "asc" },
      include: {
        groceries: true,
      },
    });
    return groceries;
  }),

  checkout: publicProcedure
    .input(z.object({ id: z.coerce.number(), payment: z.coerce.number() }))
    .mutation(async ({ ctx, input }) => {
      const { id, payment } = input;
      const shoppingList = await ctx.db.shoppingList.findUnique({
        where: { id },
      });

      if (!shoppingList) {
        throw new Error("Shopping list not found");
      }

      return ctx.db.shoppingList.update({
        where: { id },
        data: {
          payment,
          paid: true,
        },
      });
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
