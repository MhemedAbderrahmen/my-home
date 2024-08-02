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
      const groceries = await ctx.db.inventory.findFirst({
        where: {
          id: input.id,
        },
        select: {
          Groceries: true,
        },
      });

      return ctx.db.inventory.update({
        where: {
          id: input.id,
        },
        data: {
          Groceries: {
            connect: input.groceries.map((id) => ({ id })),
          },
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.inventory.findMany({
      where: {
        id: 0,
      },
    });
  }),
});
