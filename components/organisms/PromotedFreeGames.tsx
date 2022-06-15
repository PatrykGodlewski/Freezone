import Image from 'next/image';
import React from 'react';

const GAMES = [
  {
    id: '1',
    title: 'Hitman',
    description: 'Gra o łysym chłopie',
  },
];

const PromotedFreeGames = () => {
  return (
    <div>
      <h1 className="font-bold">Promoted Free Games</h1>
      <ul className="card-list flex">
        {GAMES.map(
          ({ id, title, description }, index): React.ReactNode => (
            <li
              key={index}
              className="card rounded border-gray-400 dark:border-gray-600 bg-transparent flex flex-col w-1/5 p-4"
            >
              <h2 className="font-bold">{`${title} - #${id}`}</h2>
              <p>{description}</p>
              <button>Check out</button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default PromotedFreeGames;
