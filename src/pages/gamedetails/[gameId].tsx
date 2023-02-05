import Button from "@components/atoms/Button/Button";
import { api } from "@utils/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const GameDetails = () => {
  const { query } = useRouter();
  const gameQuery = api.games.getDetails.useQuery({
    gameId: query.gameId as string,
  });

  const { data } = gameQuery;

  const [imgs, setImgs] = useState<TImages | null>(null);

  useEffect(() => {
    if (!data?.images) return;
    const images = JSON.parse(data?.images as string) as TImages;
    setImgs(images);
  }, [data]);

  return !gameQuery.isFetched ? (
    <></>
  ) : (
    <div className="px-4">
      <h1 className={"text-left"}>{data?.game_name}</h1>
      <div className="mt-8 grid  w-full grid-cols-1  md:grid-cols-[3fr_1fr] md:flex-row">
        <div className="flex flex-col gap-8">
          <div className="rounded bg-slate-600">
            <Image
              alt={`Image of game ${data?.game_name ?? ""}`}
              src={imgs?.horizontal ?? ""}
              className="rounded transition-opacity"
              style={{ opacity: 0 }}
              height={1080}
              width={1920}
              onLoad={(ref) => {
                ref.currentTarget.setAttribute("style", "opacity: 1");
              }}
            />
          </div>
          <div className=" rounded bg-slate-100 p-8 dark:bg-slate-800">
            <h3>{data?.description}</h3>
          </div>
          <Link
            passHref
            className=" block w-full"
            href={`https://store.epicgames.com/pl/p/${data?.url_slug ?? ""}`}
          >
            <Button
              type="full"
              className="flex w-full justify-between gap-8 whitespace-nowrap px-4 md:max-w-min"
            >
              <span>Check out</span> <p>FREE</p>
            </Button>
          </Link>
        </div>
        <div className="hidden rounded bg-slate-800 md:ml-8 md:block"></div>
      </div>
    </div>
  );
};

export default GameDetails;
