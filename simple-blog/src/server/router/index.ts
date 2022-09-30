import { createRouter } from "../createRouter";
import { user } from "./user.router";

export const appRouter = createRouter().merge("users.", user);

export type AppRouter = typeof appRouter;
