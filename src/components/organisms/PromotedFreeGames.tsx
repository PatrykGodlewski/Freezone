import Card from "@components/molecules/Card/Card";

const PromotedFreeGames = ({ games, title, typeGame }) => {
  return (
    <div className="px-8">
      <h1>{title}</h1>
      <ul className="card-list grid gap-8 p-8 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-5 ">
        {games &&
          games.map(({ game_name, images, app_id, is_free }, index: number) => {
            let img_url;
            if (typeGame === GameTypes.EPIC_GAMES) {
              const parsed = JSON.parse(images);
              img_url = parsed.tall_img.url;
            }
            if (typeGame === GameTypes.STEAM) {
              img_url = images;
            }
            return (
              <Card
                type={"game"}
                id={app_id}
                key={index}
                title={game_name}
                description={"description"}
                heroImg={img_url}
                free={is_free}
                typeGame={typeGame}
              />
            );
          })}
        <Card type={"trail"} />
      </ul>
    </div>
  );
};

export default PromotedFreeGames;
