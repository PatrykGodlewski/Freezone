import HeroSlider from '@components/organisms/HeroSlider/HeroSlider';
import PromotedFreeGames from '@components/organisms/PromotedFreeGames';
import type { NextPage } from 'next';
import { db } from '@utils/db.server';
import { GameTypes } from '@constants/gameTypes';

type Props = {
  jsonGames: string;
};

export const getServerSideProps = async () => {
  const epicGames = await db.epic_games.findMany({
    orderBy: {
      is_free: 'desc',
    },
  });
  const steamGames = await db.steam_games.findMany({
    take: 4,
  });
  const jsonGames = JSON.stringify({
    epicGames,
    steamGames,
  });
  return { props: { jsonGames } };
};

const Home: NextPage<Props> = ({ jsonGames }) => {
  const { epicGames, steamGames } = JSON.parse(jsonGames);
  return (
    <>
      {/* <HeroSlider /> */}
      <PromotedFreeGames
        games={epicGames}
        typeGame={GameTypes.EPIC_GAMES}
        title={'Epic Store Free Games - Limited Time'}
      />
      <PromotedFreeGames
        games={steamGames}
        typeGame={GameTypes.STEAM}
        title={'4 Random Steam Free Games'}
      />
      {/* <PromotedFreeGames games={} /> */}
      {/* <RecentFreeGames/> */}
      {/* <AllFreGames/> */}
    </>
  );
};

export default Home;
