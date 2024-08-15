import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const invitationsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        to: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hasInvite = await ctx.db.invitation.findFirst({
        where: {
          userId: input.to,
        },
      });
      if (hasInvite) throw new TRPCError({ code: "CONFLICT" });
      return await ctx.db.invitation.create({
        data: {
          senderId: ctx.user.userId,
          userId: input.to,
        },
      });
    }),

  delete: protectedProcedure.mutation(async ({ ctx }) => {
    const invitation = await ctx.db.invitation.findFirst({
      where: {
        userId: ctx.user.userId,
      },
    });
    if (!invitation) throw new TRPCError({ code: "NOT_FOUND" });
    return await ctx.db.invitation.delete({
      where: { id: invitation.id },
    });
  }),
});
