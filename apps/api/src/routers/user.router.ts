import { createTRPCRouter, publicProcedure } from '../trpc';
import { prisma } from '../db';
import {
  userByIdInputSchema,
  userCreateInputSchema,
} from '@repo/validation-schemas';
import { authGuardProcedure } from '../guards/authGuardProcedure';

export const userRouter = createTRPCRouter({
  list: authGuardProcedure.query(({ ctx }) => {
    console.log('______________________________');
    console.log('CTX.REQ: ', ctx.req.cookies);
    console.log('______________________________');

    return prisma.testUser.findMany();
  }),
  // list: publicProcedure.query(({ ctx }) => {
  //   console.log('______________________________');
  //   console.log('CTX.REQ: ', ctx.req.cookies);
  //   console.log('______________________________');

  //   return prisma.testUser.findMany();
  // }),
  byId: publicProcedure.input(userByIdInputSchema).query((req) => {
    return prisma.testUser.findUnique({
      where: { id: req.input },
      include: { posts: true },
    });
  }),
  create: publicProcedure.input(userCreateInputSchema).mutation((req) => {
    return prisma.testUser.create({
      data: req.input,
    });
  }),
});
