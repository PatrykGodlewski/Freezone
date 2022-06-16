import Button from '@components/atoms/Button/Button';
import Link from 'next/link';
import React from 'react';

type PropsType = {
  title?: string;
  id?: string;
  description?: string;
  type: 'trail' | 'game';
};

const Card = ({ title, id, description, type }: PropsType) => {
  return (
    <>
      {type === 'game' && (
        <li className="cursor-pointer ring-hover-effect rounded shadow bg-gray-100 dark:bg-gray-800 flex flex-col">
          <Link href={`/gamedetails/${id}`}>
            <a className="focus:focus-visible:outline focus:focus-visible:outline-2 focus:focus-visible:outline-gray-50 focus:focus-visible:outline-offset-4 rounded">
              <img
                src={'https://via.placeholder.com/468x300'}
                alt="Game preview img"
                className="rounded-t"
              />
              <div className="p-4 flex flex-col gap-4">
                <h2 className="font-bold text-2xl">{`${title} - #${id}`}</h2>
                <p>price 1.99$</p>
                <p className="text-sm">{description}</p>
                <Button type="full">Check out</Button>
              </div>
            </a>
          </Link>
        </li>
      )}
      {type === 'trail' && (
        <li className="ring-hover-effect rounded shadow bg-gray-100 dark:bg-gray-800 flex flex-col sm:col-span-2 lg:col-span-2 xl:col-span-1">
          <div className="p-8 flex flex-col justify-center h-full ">
            <Button type="outline">Show more</Button>
          </div>
        </li>
      )}
    </>
  );
};

export default Card;
