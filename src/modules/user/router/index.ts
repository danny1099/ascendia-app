import { Invitation } from "@prisma/client";
import { param, procedure, router } from "@/trpc/init";
import { tryCatch } from "@/shared/utils";
import type { InvitedUser, User } from "@/modules/user/types";
import { userInvitationSchema, userSchema } from "@/modules/user/schema";
import { auth } from "@/modules/auth/config";

export const userRouter = router({
  create: procedure.input(userSchema).mutation<APIResult<User>>(async ({ ctx, input }) => {
    const { name, email, password, role, avatar } = input;

    /* validate if user already exists with email */
    const user = await ctx.db.user.findUnique({ where: { email } });
    if (user) {
      return {
        data: null,
        status: "error",
        message: "user_already_exists",
        code: 409,
      };
    }

    const { data, error } = await tryCatch(
      ctx.db.user.create({
        data: {
          name,
          email,
          emailVerified: true,
          image: avatar,
          hasOnboarding: true,
          status: "ACTIVE",
          role,
        },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: error?.message,
        code: 500,
      };
    }

    /* adding user to organization on members table */
    const { data: member, error: memberError } = await tryCatch(
      auth.api.addMember({
        headers: ctx.headers,
        body: {
          userId: data.id,
          organizationId: ctx.organizationId as string,
          role: role as "member" | "owner" | "admin",
        },
      })
    );

    if (memberError || !member) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: memberError?.message,
        code: 500,
      };
    }

    return {
      data,
      status: "success",
      message: "user_created",
      code: 201,
    };
  }),

  getAll: procedure.query<APIResult<User[]>>(async ({ ctx }) => {
    const { data, error } = await tryCatch(
      ctx.db.member.findMany({
        where: { organizationId: ctx.organizationId as string },
        include: { user: true },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: error?.message,
        code: 500,
      };
    }

    /* add as_iam property to check if user is current signed in user */
    const result = data.map((member) => ({
      ...member.user,
      role: member.role,
    }));

    return {
      data: result as User[],
      status: "success",
      message: null,
      code: 200,
    };
  }),
  invite: procedure.input(userInvitationSchema).mutation<APIResult<Invitation>>(async ({ ctx, input }) => {
    const { email, role } = input;

    /* check if user already invited to organization */
    const hasInvitation = await ctx.db.invitation.findFirst({
      where: { email, AND: { organizationId: ctx.organizationId as string } },
    });
    if (hasInvitation) {
      return {
        data: null,
        status: "error",
        message: "user_already_invited",
        code: 409,
      };
    }

    const { data, error } = await tryCatch(
      auth.api.createInvitation({
        headers: ctx.headers,
        body: {
          email,
          organizationId: ctx.organizationId as string,
          role: role as "member" | "owner" | "admin",
          resend: true,
        },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "user_invitation_error",
        errorMessage: error?.message,
        error,
        code: 500,
      };
    }

    return {
      data: data as Invitation,
      status: "success",
      message: "user_invited",
      code: 200,
    };
  }),
  getInvitation: procedure.input(param).query<APIResult<InvitedUser>>(async ({ ctx, input }) => {
    const { param: invitationId } = input;

    const { data, error } = await tryCatch(
      auth.api.getInvitation({
        headers: ctx.headers,
        query: {
          id: invitationId,
        },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: error?.message,
        code: 500,
      };
    }

    const inviter = await ctx.db.user.findUnique({
      where: { email: data.inviterEmail },
    });

    const members = await ctx.db.user.findMany({
      where: {
        OR: [{ members: { some: { organizationId: data.organizationId } } }],
      },
    });

    /* add properties inviter and members to invitation response */
    const result = {
      ...data,
      inviterName: inviter?.name,
      inviterAvatar: inviter?.image,
      activeOrganization: ctx.organization,
      members,
    } as InvitedUser;

    return {
      data: result as InvitedUser,
      status: "success",
      message: null,
      code: 200,
    };
  }),
  allInvitations: procedure.query<APIResult<InvitedUser>>(async ({ ctx }) => {
    /* get current signed in user */
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.userId as string },
    });

    if (!user) {
      return {
        data: null,
        status: "error",
        message: "user_not_found",
        code: 404,
      };
    }

    /* get all invitations for current signed in user */
    const { data, error } = await tryCatch(
      ctx.db.invitation.findFirst({
        where: { email: user.email },
        include: { organization: true, inviter: true },
        orderBy: { createdAt: "desc" },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: error?.message,
        code: 500,
      };
    }

    const { inviter, organization, ...rest } = data;
    const result = {
      ...rest,
      inviterId: inviter.id,
      inviterName: inviter.name,
      inviterEmail: inviter.email,
      inviterAvatar: inviter.image,
      organizationId: organization.id,
      organizationName: organization.name,
      organizationSlug: organization.slug,
      activeOrganization: ctx.organization,
    } as InvitedUser;

    return {
      data: result,
      status: "success",
      message: null,
      code: 200,
    };
  }),
});
