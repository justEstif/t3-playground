import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";
import { createUserSchema } from "../../schema/user.schema";
import { createRouter } from "../createRouter";

export const userRouter = createRouter().mutation("register-user", {
  input: createUserSchema, // validate input and get types
  resolve: async ({ ctx, input }) => {
    const { name, email } = input; // extract input object fields

    try {
      const user = await ctx.prisma.user.create({
        data: {
          email,
          name,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          // violate unique constraint
          throw new TRPCError({
            code: "CONFLICT",
            message: "User already exists",
          });
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Error ${error.code}: ${error.message}`,
          });
        }
      }
    }
  },
});
