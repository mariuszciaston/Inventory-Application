import { Request, Response } from "express";

import {
  getAllGames,
  getGameDetails,
  getAllPlatforms,
  getAllGenres,
  postNewGame,
  updateGameDetails,
  deleteGame,
} from "../db/queries.js";

async function renderIndexPage(_req: Request, res: Response) {
  const games = await getAllGames();
  res.render("index", { games });
}

async function renderNewGameForm(req: Request, res: Response) {
  const game = await getGameDetails(req.params.id);
  const genres = await getAllGenres();
  const platforms = await getAllPlatforms();

  res.render("games/newGameForm", { game, genres, platforms });
}

async function renderGamePage(req: Request, res: Response) {
  const game = await getGameDetails(req.params.id);
  res.render("games/game", { game });
}

async function renderEditGameForm(req: Request, res: Response) {
  const game = await getGameDetails(req.params.id);
  const genres = await getAllGenres();
  const platforms = await getAllPlatforms();
  res.render("games/gameEditForm", { game, genres, platforms });
}

async function submitNewGame(req: Request, res: Response) {
  const { name, released, genre, platforms } = req.body;
  const platformsArray = Array.isArray(platforms) ? platforms : [platforms];
  await postNewGame(name, released, genre, platformsArray);
  res.redirect("/");
}

async function changeGameDetails(req: Request, res: Response) {
  const { name, released, genre, platforms } = req.body;
  const platformsArray = Array.isArray(platforms) ? platforms : [platforms];
  const gameId = req.params.id;
  await updateGameDetails(name, released, genre, platformsArray, gameId);
  res.redirect("/");
}

async function removeGame(req: Request, res: Response) {
  await deleteGame(req.params.id);
  res.redirect("/");
}

export {
  renderIndexPage,
  renderNewGameForm,
  renderGamePage,
  renderEditGameForm,
  submitNewGame,
  changeGameDetails,
  removeGame,
};
