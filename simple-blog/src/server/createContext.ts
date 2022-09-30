import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../utils/prisma";

type TContext = {
  req: NextApiRequest;
  res: NextApiResponse;
};

export const createContext = ({ req, res }: TContext) => ({
  req,
  res,
  prisma,
});

export type Context = ReturnType<typeof createContext>;
