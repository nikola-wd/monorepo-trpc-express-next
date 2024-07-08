import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import cookieParser from 'cookie-parser';
import { appRouter } from './routers';
import cors from 'cors';
import { prisma } from './db';
import { createContext } from './Context';
import passport from './util/passport';
// import { currentUser } from './middlewares/currentUser';
import { renderTrpcPanel } from 'trpc-panel';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3001', // Your Next.js app's URL
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// TODO: Maybe apply this inside middlewares/index.ts
// app.use(currentUser); // Apply the middleware

const port = process.env.PORT ?? 3002;

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.use('/panel', (_, res) => {
  return res.send(renderTrpcPanel(appRouter, { url: '/trpc' }));
});

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on('SIGINT', () => {
  prisma.$disconnect();
  server.close();
});
