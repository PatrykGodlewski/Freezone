// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import ProgressBar from 'progress';
import SteamAPI from 'steamapi';
import fs from 'fs';

import Logger from '@utils/Logger';
import { db } from '@utils/db.server';
import { REQUEST_METHODS, REQUEST_HEADERS } from '@constants/apiRequests';
import dataImportedFromTempAppIdsToIgnore from '../../temp/appIdsToIgnore.json';

type DATA_TO_IGNORE_TYPE = { index: number; appid: number; found?: boolean };

const UPDATE_DELAY = 5 * 60 * 1000;

const steamApi = new SteamAPI(process.env.STEAM_API_KEY);
const dataToIgnore: Array<DATA_TO_IGNORE_TYPE> = [
  ...dataImportedFromTempAppIdsToIgnore,
];

let busy = false;
let bar: ProgressBar;

const makeLoadingBar = (barLenght: number) => {
  return new ProgressBar('-> Fetching [:bar] :percent :etas ', {
    total: barLenght,
    width: 30,
  });
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
        const isAppNotFound = dataToIgnore.find((elem) => elem.appid === appid);
        if (isAppNotFound instanceof Object) continue;

        const isGame = await db.steam_games.findUnique({
          where: {
            app_id: appid,
          },
        });
        if (isGame instanceof Object) {
          //check date if longer than a week make update request
          if (!isGame.release_date) {
            const {
              short_description,
              release_date,
              name,
              steam_appid,
              is_free,
              header_image,
            } = await steamApi.getGameDetails(appid);
            await db.steam_games.update({
              where: {
                app_id: appid,
              },
              data: {
                game_name: name,
                app_id: steam_appid,
                is_free,
                images: header_image,
                release_date: new Date(release_date.date),
                description: short_description ?? '',
              },
            });
          }
          continue;
        }

        const {
          type,
          short_description,
          release_date,
          name,
          steam_appid,
          is_free,
          header_image,
        } = await steamApi.getGameDetails(appid);

        if (type === 'game' && is_free) {
          await db.steam_games.create({
            data: {
              game_name: name,
              app_id: steam_appid,
              is_free,
              images: header_image,
              release_date: new Date(release_date.date),
              description: short_description ?? '',
            },
          });
        } else {
          dataToIgnore.push({ index, appid, found: true });
        }
      } catch (error: any) {
        if (error.message === 'Too Many Requests') {
          Logger.error(error.message, `Next retry in ${UPDATE_DELAY}ms`);
          setTimeout(() => {
            busy = false;
            updateDatabase(req, res, index - 1);
          }, UPDATE_DELAY);
          fs.writeFileSync(
            './temp/appIdsToIgnore.json',
            JSON.stringify(dataToIgnore)
          );
          break;
        }
        Logger.info(error.message, `Index: ${index}`, `Appid: ${appid}`);
        if (error.message === 'App not found') {
          dataToIgnore.push({ index, appid });
        }
      }
    }

    if (listIndexForRecurse >= appList.length) {
      busy = false;
      res.status(200).send('200 - succes');
    }
  } catch (error: any) {
    Logger.error(error);
    res.status(400).send(error.message ?? error);
  }
}
