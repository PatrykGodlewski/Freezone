import Button from '@components/atoms/Button/Button';
import { GameTypes } from '@constants/gameTypes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';

type PropsType = {
  title?: string;
  id?: string | number;
  description?: string;
  type: 'trail' | 'game';
  heroImg?: string;
  free?: boolean;
};

const Card = ({ title, type, heroImg, id, free, typeGame }: PropsType) => {
  return (
    <>
      {type === 'game' && (
        <li className="ring-hover-effect rounded shadow bg-gray-50 dark:bg-gray-800 flex flex-col">
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
                <Image
                  src={`${heroImg}`}
                  height={600}
                  width={468}
                  alt="Game preview image"
                  className="rounded"
                />
              </div>
              <h2 className="font-bold text-base -mt-2 z-10">{title}</h2>
              {free ? (
                <Link
                  href={`/gamedetails/${id}?game_type=${typeGame}`}
                  className="block w-full"
                >
                  <Button
                    type="full"
                    className="flex justify-between px-4 w-full"
                  >
                    <span>Check out</span> <p>FREE</p>
                  </Button>
                </Link>
              ) : (
                <Button
                  type="outline"
                  className="flex justify-between px-4 w-full"
                >
                  <span>Unavilable yet</span>
                </Button>
              )}
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
