import type { GetServerSideProps } from 'next';
import type { GameType } from 'types/GameType';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { db } from '@utils/db.server';
import Button from '@components/atoms/Button/Button';
import storeUrlFactory from '@utils/StoreUrlFactory';
import { ParsedUrlQuery } from 'querystring';

import { GameTypes } from '@constants/gameTypes';

type Props = {
  jsonGameData: string;
  storeUrl: string;
};

const queryCheck = (query: ParsedUrlQuery) => {
  const game_type = query.game_type as GameType;
  if (query.app_id instanceof Array) {
    return { app_id: query.app_id.pop(), game_type };
  } else {
    return { app_id: query.app_id, game_type };
  }
};

const findGame = async (
  appId: number | string,
  gameType: GameType,
  locale?: string //add types for all locales
) => {
  if (gameType === GameTypes.EPIC_GAMES) {
    return await db.epic_games.findUnique({
      where: {
        app_id: appId,
      },
    });
  }

  if (gameType === GameTypes.STEAM) {
    return await db.steam_games.findUnique({
      where: {
        app_id: +appId,
      },
    });
  }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!Object.keys(context.query).length) return { props: {} };
  const { app_id, game_type } = queryCheck(context.query);
  const { locale } = context;

  const storeUrl = storeUrlFactory(locale, app_id, game_type);
  const jsonGameData = JSON.stringify(
    await findGame(app_id, game_type, locale)
  );

  return { props: { jsonGameData, storeUrl, game_type } };
};

const App_id = ({ jsonGameData, storeUrl, game_type }: Props) => {
  const gameData = JSON.parse(jsonGameData);
  const image =
    game_type === GameTypes.EPIC_GAMES
      ? JSON.parse(gameData.images).wide_img.url
      : gameData.images;
  return (
    <div className="w-full h-screen flex mt-8">
      <div className={'w-2/3'}>
        <Image
          alt={`Image of game ${gameData.game_name}`}
          src={image}
          className="rounded"
          height={1080}
          width={1920}
        />
      </div>
      <div className="w-1/3 p-8 flex flex-col gap-8">
        <h1>{gameData.game_name}</h1>
        <div className="p-8 bg-slate-100 dark:bg-slate-800 rounded">
          <h3>{gameData.description}</h3>
        </div>
        <Link href={storeUrl}>
          <a className=" block w-full">
            <Button type="full" className="flex justify-between px-4 w-full">
              <span>Check out</span> <p>FREE</p>
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default App_id;
