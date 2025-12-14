import { Request, Response } from "express";

import {
  getAllPlatforms,
  getPlatformById,
  getGamesByPlatform,
  postNewPlatform,
  updatePlatformName,
} from "../db/queries.js";

async function renderPlatformsPage(_req: Request, res: Response) {
  const platforms = await getAllPlatforms();
  res.render("platforms", { platforms });
}

async function renderGamesByPlatform(req: Request, res: Response) {
  const games = await getGamesByPlatform(req.params.id);
  const platform = await getPlatformById(req.params.id);
  res.render("platform", { games, platformName: platform.name, platform });
}

async function renderNewPlatformForm(_req: Request, res: Response) {
  res.render("newPlatformForm");
}

async function submitNewPlatform(req: Request, res: Response) {
  await postNewPlatform(req.body.name);
  res.redirect("/platforms");
}

async function renderEditPlatformForm(req: Request, res: Response) {
  const platform = await getPlatformById(req.params.id);
  res.render("platformEditForm", { platform });
}

async function changePlatformName(req: Request, res: Response) {
  const platformId = req.params.id;
  const newPlatformName = req.body.name;
  await updatePlatformName(platformId, newPlatformName);
  res.redirect("/platforms");
}

export {
  renderPlatformsPage,
  renderGamesByPlatform,
  renderNewPlatformForm,
  submitNewPlatform,
  renderEditPlatformForm,
  changePlatformName,
};
