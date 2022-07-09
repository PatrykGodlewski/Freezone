import { Collect } from '@supercharge/collections/dist';
const seperateIds = (applist: any) => {
  return new Promise((resolve, reject) => {
    const arrOfIds = applist.applist.apps.filter((game: any) => {
      if (game.name.length) return game.appid;
    });

    const data = arrOfIds.map((item: any) => {
      return item.appid;
    });

    resolve(data);
  });
};

const chunk = (items, size) => {
  return Collect(items).chunk(size).all();
};
export { seperateIds, chunk };
