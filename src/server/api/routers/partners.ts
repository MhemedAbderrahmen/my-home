import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const partnersRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const partners = await ctx.db.partners.findFirst({
      where: {
        mainPartner: ctx.user.userId,
      },
    });
    return partners;
  }),
});
