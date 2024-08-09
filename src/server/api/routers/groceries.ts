import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const groceriesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        shoppingListId: z.coerce.number(),
        itemName: z.string().min(2).max(50),
        quantity: z.coerce.number().positive(),
        threshhold: z.coerce.number().positive(),
        unit: z.string().min(2).max(50),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.groceries.create({
        data: {
          itemName: input.itemName,
          unit: input.unit,
          quantity: input.quantity,
          threshold: input.threshhold,
          shoppingListId: input.shoppingListId,
        },
      });
    }),

  getAll: protectedProcedure
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

  archive: protectedProcedure
    .input(
      z.object({
        id: z.coerce.number(),
        archived: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      await ctx.db.groceries.update({
        where: { id },
        data: { archived: input.archived },
      });

      return true;
    }),

  delete: protectedProcedure
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

  increase: protectedProcedure
    .input(
      z.object({
        id: z.coerce.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.db.groceries.update({
        where: { id },
        data: { quantity: { increment: 1 } },
      });
    }),

  decrease: protectedProcedure
    .input(
      z.object({
        id: z.coerce.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.db.groceries.update({
        where: { id },
        data: { quantity: { decrement: 1 } },
      });
    }),
});
