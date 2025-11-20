import { Request, Response } from "express";

import { getAllGames } from "../db/queries.js";

async function getIndex(_req: Request, res: Response) {
  const games = await getAllGames();
  res.render("index", { games });
}

export { getIndex };
