// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@utils/db.server';
import { seperateIds, chunk } from '@utils/utils.server';

type Data = {
  name: string;
};

export default async function updateDatabase(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const appListResponse = await fetch(
      `http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=${process.env.STEAM_API_KEY}&format=json`
    );
    const appListData = await appListResponse.json();

    const arrOfIds = await seperateIds(appListData);
    const chunks = await chunk(arrOfIds, 500);
    // BLOK START
    // TODO: add steam_app_id to array
    // TODO: dac do pętli i iterowac po długosci tablicy chunks i wyswietlic wszystkie darmower gierki

    let allGamesPromises = [];
    let i = 0;
    const iterateThroAllGamesFetch = () => {
      setTimeout(async () => {
        const data = await fetch(
          `https://store.steampowered.com/api/appdetails/?appids=${chunks[
            i
          ].toString()}&key=${
            process.env.STEAM_API_KEY
          }&format=json&filters=price_overview`
        );

        await allGamesPromises.push(data);
        i++;
        if (i < 3) {
          iterateThroAllGamesFetch();
        }
      }, 1000);
    };
    iterateThroAllGamesFetch();
    console.log(allGamesPromises, i);
    // const resFromChunk = await Promise.all(allGamesPromises);
    // const xd = resFromChunk.map((promise) => promise.json());
    // const filteredGames = Object.values(resFromChunk).filter(
    //   (value) =>
    //     value?.data?.price_overview?.final_formatted.toLowerCase() === 'free' &&
    //     value
    // );
    // BLOK END
    res.status(200).json({ allGamesPromises });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to load data' });
  }
}
