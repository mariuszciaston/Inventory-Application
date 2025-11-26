import { Request, Response } from "express";

import {
  getAllPlatforms,
  getGamesByPlatform,
  postNewPlatform,
} from "../db/queries.js";

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

async function renderNewPlatformForm(_req: Request, res: Response) {
  res.render("newPlatformForm");
}

async function submitNewPlatform(req: Request, res: Response) {
  await postNewPlatform(req.body.name);
  res.redirect("/platforms");
}

export {
  renderPlatformsPage,
  renderGamesByPlatform,
  renderNewPlatformForm,
  submitNewPlatform,
};
