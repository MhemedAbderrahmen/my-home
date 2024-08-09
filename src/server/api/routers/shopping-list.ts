import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const shoppingListRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({ name: z.string().min(1), description: z.string().min(1) }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.shoppingList.create({
        data: {
          userId: ctx.user.userId,
          name: input.name,
          description: input.description,
        },
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.shoppingList.findFirst({
      where: { paid: false, userId: ctx.user.userId },
      orderBy: { createdAt: "desc" },
      include: {
        groceries: true,
      },
    });
  }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const groceries = await ctx.db.shoppingList.findMany({
      where: { paid: false, userId: ctx.user.userId },
      orderBy: { createdAt: "asc" },
      include: {
        groceries: true,
      },
    });
    return groceries;
  }),

  getPaidLists: protectedProcedure.query(async ({ ctx }) => {
    const groceries = await ctx.db.shoppingList.findMany({
      where: { paid: true, userId: ctx.user.userId },
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
        include: {
          groceries: true,
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
