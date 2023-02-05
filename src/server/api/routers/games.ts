import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

import type { inferRouterOutputs } from "@trpc/server";

export const gamesRoute = createTRPCRouter({
  getEpicGames: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.game.findMany({
      where: { game_vendor: "epic" },
    });
  }),
  getSteamGames: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.game.findMany({
      take: 5,
      where: { game_vendor: "steam", is_free: true },
      orderBy: { release_date: "desc" },
    });
  }),
  getDetails: publicProcedure
    .input(z.object({ gameId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.game.findUnique({
        where: { app_id: input.gameId },
      });
    }),
});

export type GamesRouter = inferRouterOutputs<typeof gamesRoute>;
