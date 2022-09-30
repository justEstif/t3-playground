// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "../../../env/server.mjs";
import { appRouter } from "../../../server/router";
import { createContext } from "../../../server/createContext";

export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          error.code === "INTERNAL_SERVER_ERROR"
            ? console.error(`❌ tRPC failed on ${path}: ${error}`)
            : console.error(error);
        }
      : undefined,
});
