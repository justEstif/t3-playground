import { router } from "@trpc/server";
import superjson from "superjson";
import { Context } from "./createContext";

// helper function for type router
export function createRouter() {
  return router<Context>().transformer(superjson);
}
