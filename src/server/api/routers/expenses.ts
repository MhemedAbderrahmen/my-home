import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const expensesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ householdId: z.coerce.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.expenses.create({
        data: {
          total: 0,
          householdId: input.householdId,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({ householdId: z.coerce.number(), expense: z.coerce.number() }),
    )
    .mutation(async ({ ctx, input }) => {
      const oldExpense = await ctx.db.expenses.findFirst({
        where: {
          householdId: input.householdId,
        },
      });
      if (!oldExpense) throw new TRPCError({ code: "NOT_FOUND" });

      return await ctx.db.expenses.update({
        where: {
          id: oldExpense.id,
        },
        data: {
          total: oldExpense.total + input.expense,
        },
      });
    }),

  getMonthly: protectedProcedure
    .input(
      z.object({
        householdId: z.coerce.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.expenses.findFirst({
        where: {
          householdId: input.householdId,
        },
      });
    }),
});
