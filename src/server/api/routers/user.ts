import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const createdUser = await ctx.db.user.create({
      data: {
        clerkId: ctx.user.userId,
      },
    });
    return createdUser.id;
  }),

  get: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
