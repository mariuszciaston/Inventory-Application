import { Request, Response } from "express";

import { getGameDetails } from "../db/queries.js";

async function renderGamePage(req: Request, res: Response) {
  const game = await getGameDetails(req.params.id);
  res.render("game", { game });
}

export { renderGamePage };
