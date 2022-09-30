import { createRouter } from "../createRouter";

export const user = createRouter().mutation("register-user", {
  resolve: async ({ ctx }) => {
    ctx.prisma;
  },
});
