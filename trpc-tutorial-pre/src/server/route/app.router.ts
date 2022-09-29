import { createRouter } from "../createRouter";

// @route /api/trpc/app.hello ??
export const appRouter = createRouter().query("hello", {
  resolve: () => {
    return "hell from trpc server";
  },
});

export type AppRouter = typeof appRouter
