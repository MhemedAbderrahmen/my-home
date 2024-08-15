import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { expensesRouter } from "./routers/expenses";
import { groceriesRouter } from "./routers/groceries";
import { householdRouter } from "./routers/household";
import { inventoryRouter } from "./routers/inventory";
import { invitationsRouter } from "./routers/invitation";
import { notificationsRouter } from "./routers/notifications";
import { partnerCodeRouter } from "./routers/partner-code";
import { partnersRouter } from "./routers/partners";
import { shoppingListRouter } from "./routers/shopping-list";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  expenses: expensesRouter,
  partners: partnersRouter,
  groceries: groceriesRouter,
  inventory: inventoryRouter,
  household: householdRouter, // Add the household router to the appRouter
  partnerCode: partnerCodeRouter,
  invitations: invitationsRouter,
  shoppingList: shoppingListRouter,
  notifications: notificationsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
