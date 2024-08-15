import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const partnershipRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.partnership.create({
        data: {
          user_1Id: ctx.user.userId,
          user_2Id: input.userId,
        },
      });
    }),
  get: protectedProcedure.query(async ({ ctx }) => {
    const partnershipRouter = await ctx.db.partnership.findFirst({
      where: {
        OR: [{ user_1Id: ctx.user.userId }, { user_2Id: ctx.user.userId }],
      },
    });
    if (!partnershipRouter) throw new TRPCError({ code: "NOT_FOUND" });
    return partnershipRouter;
  }),

  delete: protectedProcedure.mutation(async ({ ctx }) => {
    const partnershipRouter = await ctx.db.partnership.findFirst({
      where: {
        OR: [{ user_1Id: ctx.user.userId }, { user_2Id: ctx.user.userId }],
      },
    });
    if (!partnershipRouter) throw new TRPCError({ code: "NOT_FOUND" });
    return await ctx.db.partnership.delete({
      where: { id: partnershipRouter.id },
    });
  }),
});
