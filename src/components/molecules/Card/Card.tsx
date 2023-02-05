import Button from "@components/atoms/Button/Button";
import Image from "next/image";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";

type PropsType = {
  title?: string;
  gameId?: string;
  description?: string;
  type: "trail" | "game";
  heroImg?: string;
  free?: boolean;
  typeGame?: string;
};

const Card = ({ title, type, heroImg, gameId, free, typeGame }: PropsType) => {
  return (
    <>
      {type === "game" && (
        <li className="ring-hover-effect flex flex-col rounded bg-gray-50 shadow dark:bg-gray-800">
          <div className="h-full rounded focus:focus-visible:outline focus:focus-visible:outline-2 focus:focus-visible:outline-offset-4 focus:focus-visible:outline-gray-50">
            <div className="flex h-full flex-col justify-between gap-4 p-4 ">
              <div className="flex flex-col gap-4">
                <Button
                  type="full"
                  className="flex h-8 w-8 items-center justify-center"
                >
                  <BsThreeDots height={"24px"} />
                </Button>

                <div className="relative">
                  <Image
                    src={`${heroImg}`}
                    height={600}
                    width={468}
                    alt="Game preview image"
                    className="rounded"
                  />
                </div>
                <h2 className="z-10 -mt-2 text-base font-bold">{title}</h2>
              </div>
              {free && gameId ? (
                <Link
                  href={`/gamedetails/${gameId}?game_type=${typeGame}`}
                  className="block w-full"
                >
                  <Button
                    type="full"
                    className="flex w-full justify-between px-4"
                  >
                    <span>Check out</span> <p>FREE</p>
                  </Button>
                </Link>
              ) : (
                <Button
                  type="outline"
                  className="flex w-full justify-between px-4"
                >
                  <span>Unavilable yet</span>
                </Button>
              )}
            </div>
          </div>
        </li>
      )}
      {type === "trail" && (
        <li className="ring-hover-effect flex flex-col rounded bg-gray-100 shadow dark:bg-gray-800 sm:col-span-2 lg:col-span-2 xl:col-span-1">
          <div className="flex h-full flex-col justify-center p-8 ">
            <Button type="outline">Show more</Button>
          </div>
        </li>
      )}
    </>
  );
};

export default Card;
