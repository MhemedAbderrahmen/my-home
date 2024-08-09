/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const inventoryRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        groceries: z.array(z.coerce.number()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const oldGroceries = await ctx.db.inventory.findFirst({
        where: {
          userId: ctx.user.userId,
        },
        select: {
          Groceries: true,
        },
      });

      const oldGroceriesIds = input.groceries.filter(
        (id) => !oldGroceries?.Groceries.some((grocery) => grocery.id === id),
      );

      const allGroceriesIds = [...oldGroceriesIds, ...input.groceries];

      return ctx.db.inventory.update({
        where: {
          userId: ctx.user.userId,
        },
        data: {
          Groceries: {
            connect: allGroceriesIds.map((id) => ({ id })),
          },
        },
      });
    }),

  getAll: protectedProcedure
    .input(
      z.object({
        itemName: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { itemName } = input;

      const inventory = await ctx.db.inventory.findFirst({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId: ctx.user.userId,
        },
        include: {
          Groceries: itemName
            ? {
                where: {
                  itemName: {
                    contains: itemName,
                    mode: "insensitive", // Optional: for case-insensitive search
                  },
                },
              }
            : true,
        },
      });

      return inventory;
    }),
});
