import HeroCard from '@components/molecules/HeroCard/HeroCard';
import React from 'react';

const HeroContent = [
  {
    title: 'Hitman',
    desc: 'Gra o łysym chlopie',
    badge: 'Free to Take',
  },
  {
    title: 'League of legends',
    desc: 'Gra o lidze legend',
    badge: 'Free to Take',
  },
  {
    title: 'Minecraft',
    desc: 'Gra o klockach',
    badge: 'Free to Take',
  },
];

const HeroSlider = () => {
  return (
    <div className="flex justify-center gap-4 my-24">
      <HeroCard dummy={HeroContent.at(0)} />
      {HeroContent.map(
        ({ title, desc, badge }, index): React.ReactNode => (
          <HeroCard
            key={index}
            index={index}
            title={title}
            desc={desc}
            badge={badge}
            className={`${
              index === 1 ? 'scale-125 z-10' : 'z-0'
            } transition-all `}
          />
        )
      )}
      <HeroCard dummy={HeroContent.at(-1)} />
    </div>
  );
};

export default HeroSlider;
