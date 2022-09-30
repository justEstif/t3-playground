// src/server/router/context.ts
import { router } from "@trpc/server";
import type { Context } from "./createContext";
import superjson from "superjson";

export const createRouter = () => router<Context>().transformer(superjson);
