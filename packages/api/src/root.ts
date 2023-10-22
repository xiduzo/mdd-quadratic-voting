import { authRouter } from "./router/auth";
import { eventRouter } from "./router/event";
import { postRouter } from "./router/post";
import { voteRouter } from "./router/vote";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  event: eventRouter,
  vote: voteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
