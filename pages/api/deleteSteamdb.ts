// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@utils/db.server';

export default async function updateDatabase(
  req: NextApiRequest,
  res: NextApiResponse
) {
  db.steam_games.deleteMany({});
}
