import { Request, Response } from "express";

import { getAllGames, getGamesByQuery } from "../db/queries.js";

async function renderIndexPage(req: Request, res: Response) {
  const q = typeof req.query.q === "string" ? req.query.q.trim() : "";

  if (q) {
    const games = await getGamesByQuery(q);
    res.render("searchResult", { games, q });
  } else {
    const games = await getAllGames();
    res.render("index", { games, q });
  }
}

export { renderIndexPage };
