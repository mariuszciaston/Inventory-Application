import { Request, Response } from "express";

import { getAllGames } from "../db/queries.js";

async function renderIndexPage(_req: Request, res: Response) {
  const games = await getAllGames();
  res.render("index", { games });
}

export { renderIndexPage };
