import { createTRPCRouter, protectedProcedure } from "../trpc";

import { indexGithubRepo } from "@/lib/github-loader";
import { pollCommits } from "@/lib/github";
import { z } from "zod";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        githubUrl: z.string(),
        githubToken: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      console.log("userId: ", userId)
      const project = await ctx.db.project.create({
        data: {
          name: input.name,
          githubUrl: input.githubUrl,
          userToProjects: {
            create: {
              user: {
                connect: { id: userId },
              },
            },
          },
        },
      });

      await indexGithubRepo(project.id, input.githubUrl, input.githubToken)
      await pollCommits(project.id)
      return project;
    }),
    getProjects: protectedProcedure.query(async( {ctx } ) => {
      return await ctx.db.project.findMany({
        where:{
          userToProjects: {
            some: {
              userId: ctx.session.user.id!
            }
          },
          deletedAt: null
        }
      })
    }),

    getCommits: protectedProcedure.input(z.object({
      projectId: z.string()
    })).query(async ({ ctx, input }) => {
      return await ctx.db.commit.findMany({ where: { projectId: input.projectId } });
    })
});
