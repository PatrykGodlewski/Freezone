import type { GameType } from 'types/GameType';
import { GameTypes } from '@constants/gameTypes';

const DEFAULT_LANG = 'en-US';
const EPIC_STORE_ORIGIN_URL = 'https://store.epicgames.com';
const STEAM_STORE_ORIGIN_URL = 'https://store.steampowered.com';

const epicStoreUrlFactory = (
  lang = DEFAULT_LANG,
  urlSlug: string | number | undefined,
  gameType: GameType
) => {
  switch (gameType) {
    case GameTypes.STEAM:
      return `${STEAM_STORE_ORIGIN_URL}/app/${urlSlug}`;
    case GameTypes.EPIC_GAMES:
      return `${EPIC_STORE_ORIGIN_URL}/${lang}/p/${urlSlug}`;
    default:
      break;
  }
};

export default epicStoreUrlFactory;
