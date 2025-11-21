import { Request, Response } from "express";

import { getAllGenres, getGamesByGenre } from "../db/queries.js";

async function renderGenresPage(_req: Request, res: Response) {
  const genres = await getAllGenres();
  res.render("genres", { genres });
}

async function renderGamesByGenre(req: Request, res: Response) {
  const games = await getGamesByGenre(req.params.id);
  res.render("genre", { games });
}

export { renderGenresPage, renderGamesByGenre };
