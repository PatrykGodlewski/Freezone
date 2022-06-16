import Button from '@components/atoms/Button/Button';
import Card from '@components/molecules/Card/Card';
import Image from 'next/image';
import React from 'react';

const GAMES = [
  {
    id: '1',
    title: 'Hitman',
    description: 'Gra o łysym chłopie',
  },
  {
    id: '2',
    title: 'Hitman',
    description: 'Gra o łysym chłopie',
  },
  {
    id: '3',
    title: 'Hitman',
    description: 'Gra o łysym chłopie',
  },
  {
    id: '4',
    title: 'Hitman',
    description: 'Gra o łysym chłopie',
  },
];

const PromotedFreeGames = () => {
  return (
    <div className=" ">
      <h1 className="font-black text-5xl">Promoted Free Games</h1>
      <ul className="card-list grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8  p-8 ">
        {GAMES.map(
          ({ id, title, description }, index): React.ReactNode => (
            <Card
              type={'game'}
              key={index}
              id={id}
              title={title}
              description={description}
            />
          )
        )}
        <Card type={'trail'} />
      </ul>
    </div>
  );
};

export default PromotedFreeGames;
