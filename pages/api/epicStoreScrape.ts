import type { NextApiRequest, NextApiResponse } from 'next';

import { getGames } from 'epic-free-games';
import Logger from '@utils/Logger';
import { db } from '@utils/db.server';

type EPIC_GAMES = {
  id: string;
  title: string;
  keyImages: Array<{
    type: string;
    url: string;
  }>;
  catalogNs: {
    mappings: Array<{
      pageSlug: string;
    }>;
  };
  description: string;
};

const handleGames = (gamesArray: Array<EPIC_GAMES>, forceFree = true) => {
  return gamesArray.forEach(
    async ({ id, title, keyImages, catalogNs, description }) => {
      const isGame =
        (await db.epic_games.findUnique({
          where: {
            app_id: id,
          },
        })) instanceof Object;

      const [imageTall] = keyImages.filter(
        ({ type }) => type === 'OfferImageTall'
      );
      const [imageWide] = keyImages.filter(
        ({ type }) => type === 'OfferImageWide'
      );

      if (isGame) return;
      await db.epic_games.deleteMany();
      await db.epic_games.create({
        data: {
          app_id: id,
          is_free: forceFree,
          game_name: title,
          images: JSON.stringify({
            tall_img: imageTall,
            wide_img: imageWide,
          }),
          url_slug: catalogNs.mappings[0].pageSlug,
          description,
        },
      });
    }
  );
};

export default async function epicStoreScrape(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { currentGames, nextGames } = await getGames('US', true);

    await handleGames(currentGames);
    await handleGames(nextGames, false);

    res.status(200).json({ currentGames, nextGames });
  } catch (error: any) {
    Logger.warn(error.message);
    res.status(400).send('fail');
  }
}
