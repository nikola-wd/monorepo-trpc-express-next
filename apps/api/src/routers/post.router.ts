import { createTRPCRouter, publicProcedure } from '../trpc';
import { prisma } from '../db';
import {
  postByIdInputSchema,
  postCreateInputSchema,
} from '@repo/validation-schemas';

export const postRouter = createTRPCRouter({
  list: publicProcedure.query(() => {
    return prisma.testPost.findMany({
      include: { author: true },
    });
  }),
  byId: publicProcedure.input(postByIdInputSchema).query((req) => {
    return prisma.testPost.findUnique({
      where: { id: req.input },
      include: { author: true },
    });
  }),
  create: publicProcedure.input(postCreateInputSchema).mutation((req) => {
    return prisma.testPost.create({
      data: req.input,
      include: { author: true },
    });
  }),
});

// Apply guard to individual procedures
// export const postRouter = createTRPCRouter({
//   getPost: publicProcedure.use(authGuard).query(async ({ ctx, input }) => {
//     // Your procedure logic
//   }),
//   createPost: publicProcedure.use(authGuard).mutation(async ({ ctx, input }) => {
//     // Your procedure logic
//   }),
