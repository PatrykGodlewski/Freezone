import PromotedFreeGames from '@components/organisms/PromotedFreeGames';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <PromotedFreeGames />
      <PromotedFreeGames />
      <PromotedFreeGames />
      {/* <RecentFreeGames/> */}
      {/* <AllFreGames/> */}
    </>
  );
};

export default Home;
