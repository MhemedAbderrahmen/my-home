import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        partner: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const createdUser = await ctx.db.user.create({
        data: {
          clerkId: ctx.user.userId,
          partner: input.partner,
        },
      });
      return createdUser.id;
    }),

  get: protectedProcedure.query(async ({ ctx }) => {
    console.log("🚀 ~ get:protectedProcedure.query ~ ctx:", ctx);
    return ctx.db.user.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
