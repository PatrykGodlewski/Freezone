import HeroSlider from '@components/organisms/HeroSlider/HeroSlider';
import PromotedFreeGames from '@components/organisms/PromotedFreeGames';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <HeroSlider />
      <PromotedFreeGames />
      <PromotedFreeGames />
      <PromotedFreeGames />
      {/* <RecentFreeGames/> */}
      {/* <AllFreGames/> */}
    </>
  );
};

export default Home;
