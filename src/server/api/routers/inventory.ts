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

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.inventory.findFirst({
      where: {
        id: 0,
      },
      include: {
        Groceries: true,
      },
    });
  }),
});
