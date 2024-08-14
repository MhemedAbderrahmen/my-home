import { createTRPCRouter, protectedProcedure } from "../trpc";

export const householdRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const inventory = await ctx.db.inventory.create({
      data: {
        userId: ctx.user.userId,
      },
    });

    return await ctx.db.household.create({
      data: {
        userId: ctx.user.userId,
        inventoryId: inventory.id,
      },
    });
  }),
});
