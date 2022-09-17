import type { GetServerSideProps } from 'next';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { db } from '@utils/db.server';
import Button from '@components/atoms/Button/Button';
import EpicStoreUrlFactory from '@utils/EpicStoreUrlFactory';

type Props = {
  jsonGameData: string;
  storeUrl: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let app_id;
  if (context.query.app_id instanceof Array) {
    app_id = context.query.app_id.pop();
  } else {
    app_id = context.query.app_id;
  }
  const { locale } = context;

  const gameData = await db.epic_games.findUnique({
    where: {
      app_id,
    },
  });

  if (!gameData) return { props: {} };

  const UrlMaker = new EpicStoreUrlFactory(locale, gameData.url_slug);
  const storeUrl = UrlMaker.getStoreUrl;

  const jsonGameData = JSON.stringify(gameData);

  return { props: { jsonGameData, storeUrl } };
};

const App_id = ({ jsonGameData, storeUrl }: Props) => {
  const gameData = JSON.parse(jsonGameData);
  const images = JSON.parse(gameData.images);
  return (
    <div className="w-full h-screen flex mt-8">
      <div className={'w-2/3'}>
        <Image
          alt={`Image of game ${gameData.game_name}`}
          src={images.wide_img.url}
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
