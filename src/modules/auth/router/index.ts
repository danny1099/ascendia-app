import { compare, hash } from "bcryptjs";
import { procedure, router } from "@/trpc/init";
import { tryCatch } from "@/shared/utils";
import { authSchema } from "@/modules/auth/schema";
import { type User } from "@/modules/auth/types";

export const authRouter = router({
  signInWithEmail: procedure.input(authSchema).mutation<TRPCResponse<User>>(async ({ ctx, input }) => {
    const { email, password } = input;

    /* check if user exists with email */
    const user = await ctx.db.user.findUnique({
      where: { email },
      include: {
        tenant: {
          select: {
            slug: true,
            plan: true,
          },
        },
      },
    });

    if (!user) return { result: null, message: "auth/invalid_credentials", status: "error" };

    /* check if password is valid compared to user password */
    const isValidPassword = await compare(password, user.password as string);
    if (!isValidPassword) return { result: null, message: "auth/invalid_credentials", status: "error" };

    return {
      message: null,
      status: "success",
      result: {
        ...user,
        role: user.role,
        slug: user.tenant?.slug,
        plan: user.tenant?.plan,
      } as User,
    };
  }),

  signUpWithEmail: procedure.input(authSchema).mutation<TRPCResponse<User>>(async ({ ctx, input }) => {
    const { email, password } = input;

    /* check if user exists with email */
    const user = await ctx.db.user.findUnique({ where: { email } });
    if (user) return { result: null, message: "auth/email_exists", status: "error" };

    const hashedPassword = await hash(password, 10);
    const { data, error } = await tryCatch(
      ctx.db.user.create({
        data: {
          email,
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    );

    /* handle error if any occurs while creating user */
    if (error) {
      return { result: null, message: "auth/failed-signup", status: "error" };
    }

    return {
      result: data as User,
      message: null,
      status: "success",
    };
  }),
});
