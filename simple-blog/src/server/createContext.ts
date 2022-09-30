import { NextApiRequest, NextApiResponse } from "next";

type TContext = {
  req: NextApiRequest;
  res: NextApiResponse;
};

export const createContext = ({ req, res }: TContext) => ({ req, res });

export type Context = ReturnType<typeof createContext>;

