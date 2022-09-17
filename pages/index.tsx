import HeroSlider from '@components/organisms/HeroSlider/HeroSlider';
import PromotedFreeGames from '@components/organisms/PromotedFreeGames';
import type { NextPage } from 'next';
import { db } from '@utils/db.server';

type Props = {
  jsonGames: string;
};

export const getServerSideProps = async () => {
  const games = await db.epic_games.findMany({
    orderBy: {
      is_free: 'desc',
    },
  });
  const jsonGames = JSON.stringify(games);
  return { props: { jsonGames } };
};

const Home: NextPage<Props> = ({ jsonGames }) => {
  const games = JSON.parse(jsonGames);
  return (
    <>
      {/* <HeroSlider /> */}
      <PromotedFreeGames
        games={games}
        title={'Epic Store Free Games - Limited Time'}
      />
      {/* <PromotedFreeGames games={} /> */}
      {/* <PromotedFreeGames games={} /> */}
      {/* <RecentFreeGames/> */}
      {/* <AllFreGames/> */}
    </>
  );
};

export default Home;
