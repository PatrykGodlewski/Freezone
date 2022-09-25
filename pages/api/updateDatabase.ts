// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import ProgressBar from 'progress';
import SteamAPI from 'steamapi';

import IgnoreFile from '@utils/IgnoreFile';
import Logger from '@utils/Logger';
import { errorHandler } from '@utils/ErrorHandler.helper';
import { db } from '@utils/db.server';
import { REQUEST_METHODS, REQUEST_HEADERS } from '@constants/apiRequests';

type ReleaseDateType = {
  type: string;
  short_description: string;
  release_date: {
    date: string;
  };
  name: string;
  steam_appid: number;
  is_free: boolean;
  header_image: JSON;
};

const UPDATE_DELAY = 5 * 60 * 1000;

const steamApi = new SteamAPI(process.env.STEAM_API_KEY ?? '');
const ignoreFiles = new IgnoreFile();

let busy = false;
let bar: ProgressBar;

const makeLoadingBar = (barLenght: number) => {
  return new ProgressBar('-> Fetching [:bar] :percent :etas ', {
    total: barLenght,
    width: 30,
  });
};

const recurse = (req: NextApiRequest, res: NextApiResponse, index: number) => {
  setTimeout(() => {
    busy = false;
    updateDatabase(req, res, index - 1);
  }, UPDATE_DELAY);
  ignoreFiles.saveTemp();
};

export default async function updateDatabase(
  req: NextApiRequest,
  res: NextApiResponse,
  listIndexForRecurse = 0
) {
  if (busy) return;
  // console.log(
  //   req.headers[REQUEST_HEADERS.accessControlRequestMethod] ===
  //     REQUEST_METHODS.update
  // );
  // checks for: SECRET, METHOD, DATE, HOW MUCH REQUESTS(MUST BE ONLY ONE GOIN ON AT THE TIME)
  try {
    const appList = await steamApi.getAppList();

    if (!bar) {
      bar = makeLoadingBar(appList.length);
    }

    for (const [index, { appid, name }] of appList.entries()) {
      busy = true;
      if (index < listIndexForRecurse) continue;
      if (!name.length) continue;

      bar.tick(1);

      try {
        const isAppNotFound = ignoreFiles.find(appid);
        if (isAppNotFound instanceof Object) continue;

        const isGame = await db.steam_games.findUnique({
          where: {
            app_id: appid,
          },
        });

        if (isGame instanceof Object) {
          //check date if longer than a week make update request
        }

        const game = await steamApi.getGameDetails(appid);

        const {
          type,
          short_description,
          release_date,
          name,
          steam_appid,
          is_free,
          header_image,
        } = game as ReleaseDateType;

        if (type === 'game' && is_free) {
          await db.steam_games.create({
            data: {
              game_name: name,
              app_id: steam_appid,
              is_free,
              images: JSON.stringify(header_image),
              release_date: release_date.date,
              description: short_description,
            },
          });
        } else {
          ignoreFiles.add({ index, appid, found: true });
        }
      } catch (error) {
        const message = errorHandler(error);
        if (message === 'Too Many Requests') {
          Logger.error(message, `Next retry in ${UPDATE_DELAY}ms`);
          recurse(req, res, index);
          break;
        }
        if (message === 'App not found') {
          Logger.info(message, `Index: ${index}`, `Appid: ${appid}`);
          ignoreFiles.add({ index, appid });
          continue;
        }
        Logger.info(message, `Index: ${index}`, `Appid: ${appid}`);
      }
    }

    if (listIndexForRecurse >= appList.length) {
      busy = false;
      res.status(200).send('200 - succes');
    }
  } catch (error) {
    const message = errorHandler(error);
    Logger.error(message);
    res.status(400).send(message ?? error);
  }
}
