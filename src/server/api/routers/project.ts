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
    }),

    saveAnswer: protectedProcedure.input(z.object({
      projectId: z.string(),
      question: z.string(),
      answer: z.string(),
      filesReferences: z.any()
    })).mutation(async({ ctx, input }) => {
      return await ctx.db.question.create({
        data: {
          answer: input.answer,
          filesReferences: input.filesReferences,
          projectId: input.projectId,
          question: input.question,
          userId: ctx.session.user.id
        }
      })
    }), 

    getQuestions: protectedProcedure.input(z.object({
      projectId: z.string()
    })).query(async({ctx, input}) => {
      return await ctx.db.question.findMany({
        where: {
          projectId: input.projectId
        },
        include: {
          user: true
        },
        orderBy:{
          createdAt: 'desc'
        }
      })
    }),

    uploadMeeting: protectedProcedure.input(z.object({ projectId: z.string(), meetingUrl: z.string(), name: z.string() }))
    .mutation(async ({ctx, input}) => {
      const meeting = await ctx.db.meeting.create({
        data:{
          meetingUrl: input.meetingUrl,
          projectId: input.projectId,
          name: input.name,
          status: "PROCESSING" //by default set to procesing
        }
      })

      return meeting
    }),
    getMeetings: protectedProcedure.input(z.object({ projectId: z.string() })).query(async ({ ctx, input }) => {
      return await ctx.db.meeting.findMany({ where: { projectId: input.projectId }, include: {issues: true}})
    }),

    deleteMeeting: protectedProcedure.input(z.object({ meetingId: z.string()})).mutation(async ({ ctx, input }) => {
      return await ctx.db.meeting.delete({where: { id: input.meetingId}})
    }),
    getMeetingById: protectedProcedure.input(z.object({meetingId: z.string()})).query(async({ ctx, input}) => {
      return await ctx.db.meeting.findUnique({
        where: {
          id: input.meetingId
        },
        include: {
          issues: true
        }
      })
    }),

    archiveProject: protectedProcedure.input(z.object({ projectId: z.string() })).mutation(async ({ ctx, input}) => {
      return await ctx.db.project.update({ where: { id: input.projectId }, data: { deletedAt: new Date() }})
    })
});
