import dayjs from "dayjs";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const partnerCodeRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.partnerCode.updateMany({
      where: { creatorId: ctx.user.userId },
      data: {
        isExpired: true,
      },
    });

    const createdCode = await ctx.db.partnerCode.create({
      data: {
        code: crypto.randomUUID(),
        creatorId: ctx.user.userId,
        expireAt: dayjs(Date.now()).add(1, "h").toDate(),
        isExpired: false,
      },
    });

    return createdCode;
  }),
});
