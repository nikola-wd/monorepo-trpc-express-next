import { createTRPCReact, type CreateTRPCReact } from '@trpc/react-query';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@w-api/src/routers/index';

export const trpc: CreateTRPCReact<AppRouter, unknown, unknown> =
  createTRPCReact<AppRouter>();

// infer the types for your router

// TODO: Is this needed?
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
