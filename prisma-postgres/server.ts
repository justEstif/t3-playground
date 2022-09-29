import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

// get all jokes
app.get("/", async (_: Request, res: Response) => {
  const jokes = await prisma.joke.findMany({
    include: { user: true },
  });
  res.status(200).json({
    jokes,
  });
});

app.post("/", async (_: Request, res: Response) => {
  const joke = await prisma.joke.create({
    data: {
      text: `['hip', 'hip']`,
      userId: "cl8mo5xs30000sbt0fdvwjbj4",
    },
  });

  res.status(200).json({ joke });
});

// get a single joke
app.get("/:joke:id", (_: Request, res: Response) => {
  res.status(200).json({
    message: "Hi",
  });
});

// create a joke

// delete a sign joke

app.get("/", (_: Request, res: Response) => {
  res.status(200).json({
    message: "Hi",
  });
});

app.listen(3001);
