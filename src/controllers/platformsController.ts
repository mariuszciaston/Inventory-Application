import { Request, Response } from "express";

import { getAllPlatforms, getGamesByPlatform } from "../db/queries.js";

async function renderPlatformsPage(_req: Request, res: Response) {
  const platforms = await getAllPlatforms();
  res.render("platforms", { platforms });
}

async function renderGamesByPlatform(req: Request, res: Response) {
  const games = await getGamesByPlatform(req.params.id);
  const platforms = await getAllPlatforms();
  const platform = platforms.find(
    (p) => p.platform_id === Number(req.params.id),
  );
  res.render("platform", { games, platformName: platform?.name });
}

export { renderPlatformsPage, renderGamesByPlatform };
