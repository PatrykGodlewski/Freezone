// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import ProgressBar from 'progress';
import SteamAPI from 'steamapi';

import Logger from '@utils/Logger';
import { db } from '@utils/db.server';

type ResponseData = [
  {
    type: string;
    name: string;
    steam_appid: number;
    is_free: string;
  }
];

const steamApi = new SteamAPI(process.env.STEAM_API_KEY);

const UPDATE_DELAY = 5 * 60 * 1000;
const LIST_INFO = {
  date: JSON.stringify(new Date()),
  lastIndex: 0,
};

let busy = false;
let bar: ProgressBar;

const makeLoadingBar = (barLenght: number) => {
  return new ProgressBar('-> Processing [:bar] :percent :etas ', {
    total: barLenght,
    width: 30,
  });
};

export default async function updateDatabase(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
  listIndexForRecurse = 0
) {
  if (busy) return;
  // console.log(req);
  // console.log(req.method);
  // console.log(req.aborted);
  // checks for: SECRET, METHOD, DATE, HOW MUCH REQUESTS(MUST BE ONLY ONE GOIN ON AT THE TIME)
  console.log(listIndexForRecurse);
  try {
    const appListUnSliced = await steamApi.getAppList();
    const appList = appListUnSliced.slice(listIndexForRecurse);

    const gamesResolved = [];

    if (!bar) {
      bar = makeLoadingBar(appListUnSliced.length);
    }

    for (const [index, { appid, name }] of appList.entries()) {
      busy = true;
      if (index <= listIndexForRecurse) continue;

      bar.tick(1);
      if (!name.length) continue;
      try {
        const { type, name, steam_appid, is_free } =
          await steamApi.getGameDetails(appid);

        if (type === 'game' && is_free)
          gamesResolved.push({ type, name, steam_appid, is_free });
      } catch (error: any) {
        if (error.message === 'Too Many Requests') {
          Logger.error(error.message, `Next retry in ${UPDATE_DELAY}ms`);
          setTimeout(() => {
            Logger.warn(index);
            LIST_INFO.lastIndex = index - 1;
            updateDatabase(req, res, index - 1);
          }, UPDATE_DELAY);
          break;
        }
        Logger.info(error.message, `Index: ${index}`, `Appid: ${appid}`);
      }
    }

    busy = false;
    Logger.info('done', LIST_INFO.lastIndex, busy);
    if (listIndexForRecurse === appListUnSliced.length) {
      res.status(200).json({ gamesResolved });
    }
  } catch (error: any) {
    Logger.error(error);
    res.status(400).send(error.message ?? error);
  }
}
