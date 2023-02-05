import Card from "@components/molecules/Card/Card";
import type { GamesRouter } from "server/api/routers/games";

type TPromotedFreeGames = { games: GamesRouter["getEpicGames"]; title: string };
type TImages = { vertical: string; horizontal: string };

const PromotedFreeGames = ({ games, title }: TPromotedFreeGames) => {
  return (
    <div className="px-8">
      <h1>{title}</h1>
      <ul className="card-list grid gap-8 p-8 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-5 ">
        {games &&
          games.map(({ game_name, images, app_id, is_free, game_vendor }) => {
            const img_url = JSON.parse(images as string) as TImages;
            console.log(is_free);
            return (
              <Card
                type={"game"}
                key={app_id}
                gameId={app_id}
                title={game_name}
                description={"description"}
                heroImg={img_url.horizontal}
                free={is_free}
                typeGame={game_vendor}
              />
            );
          })}
        <Card type={"trail"} />
      </ul>
    </div>
  );
};

export default PromotedFreeGames;
