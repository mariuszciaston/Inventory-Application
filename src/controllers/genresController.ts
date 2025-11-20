import { Request, Response } from "express";

import { getAllGenres } from "../db/queries.js";

async function renderGenresPage(_req: Request, res: Response) {
  const genres = await getAllGenres();
  res.render("genres", { genres });
}

export { renderGenresPage };
