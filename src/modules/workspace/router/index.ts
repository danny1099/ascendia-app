import type { WorkspaceType } from "@prisma/client";
import { param, procedure, router } from "@/trpc/init";
import { tryCatch, toSlug } from "@/shared/utils";
import type { Workspace } from "@/modules/workspace/types";
import { workspaceSchema, workspaceWithId } from "@/modules/workspace/schema";

export const workspaceRouter = router({
  create: procedure.input(workspaceSchema).mutation<APIResult<Workspace>>(async ({ ctx, input }) => {
    const { name, type, logo } = input;

    const slug = toSlug(name);
    const workspaceExisting = await ctx.db.workspace.findFirst({
      where: { slug, organizationId: ctx.organizationId! },
    });
    if (workspaceExisting) {
      return {
        data: null,
        status: "error",
        message: "workspace_already_exists",
        code: 400,
      };
    }

    const { data, error } = await tryCatch(
      ctx.db.workspace.create({
        data: {
          name,
          slug,
          logo,
          type: type as WorkspaceType,
          organizationId: ctx.organizationId as string,
          userId: ctx.userId as string,
        },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: error?.message,
        error,
        code: 500,
      };
    }

    return {
      data,
      status: "success",
      message: "workspace_created",
      code: 201,
    };
  }),
  edit: procedure.input(workspaceWithId).mutation<APIResult<Workspace>>(async ({ ctx, input }) => {
    const { id, name, type, logo } = input;

    const workspaceExisting = await ctx.db.workspace.findUnique({ where: { id } });
    if (!workspaceExisting) {
      return {
        data: null,
        status: "error",
        message: "workspace_not_found",
        code: 400,
      };
    }

    /* validate if slug already exists except current workspace */
    const slug = toSlug(name);
    const workspaceSlugExisting = await ctx.db.workspace.findFirst({
      where: { slug, id: { not: id } },
    });

    if (workspaceSlugExisting) {
      return {
        data: null,
        status: "error",
        message: "workspace_already_exists",
        code: 400,
      };
    }

    const { data, error } = await tryCatch(
      ctx.db.workspace.update({
        where: { id },
        data: {
          name,
          slug,
          logo,
          type: type as WorkspaceType,
        },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: error?.message,
        error,
        code: 500,
      };
    }

    return {
      data,
      status: "success",
      message: "workspace_updated",
      code: 201,
    };
  }),
  delete: procedure.input(param).mutation<APIResult<Workspace>>(async ({ ctx, input }) => {
    const { param: id } = input;

    const workspaceExisting = await ctx.db.workspace.findUnique({ where: { id } });
    if (!workspaceExisting) {
      return {
        data: null,
        status: "error",
        message: "workspace_not_found",
        code: 400,
      };
    }

    const { data, error } = await tryCatch(
      ctx.db.workspace.delete({
        where: { id },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: error?.message,
        error,
        code: 500,
      };
    }

    return {
      data: null,
      status: "success",
      message: "workspace_deleted",
      code: 200,
    };
  }),
  getAll: procedure.query<APIResult<Workspace[]>>(async ({ ctx }) => {
    const { data, error } = await tryCatch(
      ctx.db.workspace.findMany({
        where: { organizationId: ctx.organizationId!, AND: { status: "ACTIVE" } },
        include: { organization: { select: { name: true } } },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: error?.message,
        error,
        code: 500,
      };
    }

    /* add organization property to each workspace */
    const workspaces = data.map(({ organization, ...rest }) => ({
      ...rest,
      organization: organization.name,
    }));

    return {
      data: workspaces,
      status: "success",
      message: null,
      code: 200,
    };
  }),
  get: procedure.input(param).query<APIResult<Workspace>>(async ({ ctx, input }) => {
    const { param: id } = input;

    const { data, error } = await tryCatch(
      ctx.db.workspace.findFirst({
        where: { id, AND: { status: "ACTIVE" } },
        include: { organization: { select: { name: true } } },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: error?.message,
        error,
        code: 500,
      };
    }

    /* add organization property to each workspace */
    const workspace = { ...data, organization: data.organization.name };

    return {
      data: workspace,
      status: "success",
      message: null,
      code: 200,
    };
  }),
});
