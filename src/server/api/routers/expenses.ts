import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const expensesRouter = createTRPCRouter({
  getMonthly: protectedProcedure.query(async ({ ctx }) => {
    //return await ctx.db.shoppingList.findMany()
  })
});

