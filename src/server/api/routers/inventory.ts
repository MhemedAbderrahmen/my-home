/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const inventoryRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        id: z.coerce.number(),
        groceries: z.array(z.coerce.number()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const oldGroceries = await ctx.db.inventory.findFirst({
        where: {
          id: input.id,
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
          id: input.id,
        },
        data: {
          Groceries: {
            connect: allGroceriesIds.map((id) => ({ id })),
          },
        },
      });
    }),

  getAll: publicProcedure
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
          id: 0,
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
