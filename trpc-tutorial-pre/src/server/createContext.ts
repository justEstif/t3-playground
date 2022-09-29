import { NextApiRequest, NextApiResponse } from "next";

interface IContext {
  req: NextApiRequest;
  res: NextApiResponse;
}

export const createContext = ({ req, res }: IContext) => ({ req, res });

export type Context = ReturnType<typeof createContext>;
