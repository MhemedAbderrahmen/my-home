import { createTRPCRouter, protectedProcedure } from "../trpc";

export const householdRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    // Create an inventory for the household
    const inventory = await ctx.db.inventory.create({
      data: {
        userId: ctx.user.userId,
      },
    });
    // Create a household for the user
    return await ctx.db.household.create({
      data: {
        userId: ctx.user.userId,
        inventoryId: inventory.id,
      },
    });
  }),
});
