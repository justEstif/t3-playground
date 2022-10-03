import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";
import { createUserSchema, requestOtpSchema } from "../../schema/user.schema";
import { encode } from "../../utils/base64";
import { getBaseUrl } from "../../utils/constants";
import { sendLoginEmail } from "../../utils/mailer";
import { createRouter } from "../createRouter";

export const userRouter = createRouter()
  .mutation("register-user", {
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
  })
  .mutation("request-otp", {
    input: requestOtpSchema,
    resolve: async ({ ctx, input }) => {
      const { email, redirect } = input;
      const user = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const token = await ctx.prisma.loginToken.create({
        data: {
          redirect,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      sendLoginEmail({
        token: encode(`${token.id}:${user.email}`),
        url: getBaseUrl(),
        email: user.email,
      });
      // TODO send email to user
      return true;
    },
  });
