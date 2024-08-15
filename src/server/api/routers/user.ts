import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string().email(),
        imageUrl: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const createdUser = await ctx.db.user.create({
        data: {
          clerkId: ctx.user.userId,
          username: input.username,
          email: input.email,
          imageUrl: input.imageUrl,
        },
      });
      return createdUser.id;
    }),

  hasPartner: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findFirst({
      where: {
        clerkId: ctx.user.userId,
        partnersId: {
          not: null,
        },
      },
      include: {
        partners: true,
      },
    });
  }),

  me: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findFirst({
      where: {
        clerkId: ctx.user.userId,
      },
      include: {
        household: true,
        partners: true,
      },
    });
  }),

  get: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findFirst({
        where: {
          clerkId: input.userId,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string().email(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: {
          clerkId: ctx.user.userId,
        },
        data: {
          username: input.username,
          email: input.email,
          description: input.description,
          firstTimeSignIn: false,
        },
      });
    }),
});
