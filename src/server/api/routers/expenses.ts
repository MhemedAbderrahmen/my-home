import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const expensesRouter = createTRPCRouter({
  getMonthly: protectedProcedure.query(async ({ ctx }) => {
    const paidLists = await ctx.db.shoppingList.findMany({
      where: {
        paid: true,
        userId: ctx.user.userId,
      },
    });

    let shoppingListsExpenses = 0;

    paidLists.forEach((item) => {
      shoppingListsExpenses += item.payment;
    });

    return shoppingListsExpenses;
  }),
});
