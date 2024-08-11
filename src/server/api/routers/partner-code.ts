import dayjs from "dayjs";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const partnerCodeRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.partnerCode.updateMany({
      where: { userId: ctx.user.userId },
      data: {
        isExpired: true,
      },
    });

    const createdCode = await ctx.db.partnerCode.create({
      data: {
        code: crypto.randomUUID(),
        userId: ctx.user.userId,
        expireAt: dayjs(Date.now()).add(1, "h").toDate(),
        isExpired: false,
      },
    });

    return createdCode;
  }),

  get: protectedProcedure
    .input(
      z.object({
        code: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const isFound = await ctx.db.partnerCode.findFirst({
        where: {
          code: input.code,
          isExpired: false,
          userId: {
            not: ctx.user.userId,
          },
        },
        include: {
          creator: true,
        },
      });
      if (!isFound) throw new Error("Code not found!");
      return isFound;
    }),

  accept: protectedProcedure
    .input(
      z.object({
        code: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const mainPartner = await ctx.db.partnerCode.update({
        where: {
          code: input.code,
        },
        data: {
          isExpired: true,
        },
      });

      const partnership = await ctx.db.partners.create({
        data: {
          mainPartner: mainPartner.userId,
          secondaryPartner: ctx.user.userId,
        },
      });

      await ctx.db.user.updateMany({
        where: {
          clerkId: {
            in: [partnership.mainPartner, partnership.secondaryPartner],
          },
        },
        data: {
          partnersId: partnership.id,
        },
      });

      return { success: true };
    }),

  decline: protectedProcedure
    .input(
      z.object({
        code: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.partnerCode.update({
        where: {
          code: input.code,
        },
        data: {
          isExpired: true,
        },
      });
    }),
});
