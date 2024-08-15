import { NotificationType } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const notificationsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        to: z.string(),
        type: z.nativeEnum(NotificationType),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.notifications.create({
        data: {
          senderId: ctx.user.userId,
          userId: input.to,
          type: input.type,
        },
      });
    }),

  get: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.notifications.findMany({
      where: {
        user: {
          clerkId: ctx.user.userId,
        },
      },
      include: {
        user: true,
        sender: true,
      },
    });
  }),
});
