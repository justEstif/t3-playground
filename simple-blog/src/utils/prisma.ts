// NOTE prisma client file
import { PrismaClient } from "@prisma/client";
import { env } from "../env/server.mjs";

// NOTE to prevent active instance warnings in editor
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// use prisma that is current active or create new
export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// stop prisma from creating new instances
if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
