import Button from '@components/atoms/Button/Button';
import Link from 'next/link';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';

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
        <li className="cursor-pointer ring-hover-effect rounded shadow bg-gray-50 dark:bg-gray-800 flex flex-col">
          <div className="focus:focus-visible:outline focus:focus-visible:outline-2 focus:focus-visible:outline-gray-50 focus:focus-visible:outline-offset-4 rounded">
            <div className="flex flex-col gap-4 p-4 ">
              <div>
                <Button
                  type="full"
                  className="w-8 h-8 flex items-center justify-center"
                >
                  <BsThreeDots height={'24px'} />
                </Button>
              </div>
              <div className="relative">
                <h2 className="font-bold text-2xl absolute left-4 top-4">{`${title} - #${id}`}</h2>
                <img
                  src={'https://via.placeholder.com/468x600'}
                  alt="Game preview img"
                  className="rounded"
                />
              </div>
              <Link href={`/gamedetails/${id}`}>
                <a className="block w-full">
                  <Button
                    type="full"
                    className="flex justify-between px-4 w-full"
                  >
                    <span>Check out</span> <p>FREE</p>
                  </Button>
                </a>
              </Link>
            </div>
          </div>
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
