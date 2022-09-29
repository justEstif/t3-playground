import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if(process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

// warn (prima-client) There are already 10 instances of PrismaClient actively running
