import { Request, Response } from "express";
import { validationResult } from "express-validator";

import type { GameData } from "../types/types.js";

import {
  deleteGame,
  getAllGames,
  getAllGenres,
  getAllPlatforms,
  getGameDetails,
  postNewGame,
  updateGameDetails,
} from "../db/queries.js";

async function changeGameDetails(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const genres = await getAllGenres();
    const platforms = await getAllPlatforms();
    const {
      genre,
      platforms: selectedPlatforms,
      released,
      title,
    } = req.body as GameData;

    res.status(400).render("games/gameEditForm", {
      errors: errors.array(),
      game: { game_id: req.params.id },
      genre,
      genres,
      platforms,
      released,
      selectedPlatforms,
      title,
    });
  } else {
    const { genre, platforms, released, title } = req.body as GameData;
    const platformsArray = Array.isArray(platforms) ? platforms : [platforms];
    const gameId = req.params.id;
    await updateGameDetails(title, released, genre, platformsArray, gameId);
    res.redirect("/");
  }
}

async function removeGame(req: Request, res: Response) {
  await deleteGame(req.params.id);
  res.redirect("/");
}

async function renderEditGameForm(req: Request, res: Response) {
  const game = await getGameDetails(req.params.id);
  const genres = await getAllGenres();
  const platforms = await getAllPlatforms();
  res.render("games/gameEditForm", { game, genres, platforms });
}

async function renderGamePage(req: Request, res: Response) {
  const game = await getGameDetails(req.params.id);
  res.render("games/game", { game });
}

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

async function submitNewGame(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const genres = await getAllGenres();
    const platforms = await getAllPlatforms();
    const {
      genre,
      platforms: selectedPlatforms,
      released,
      title,
    } = req.body as GameData;

    res.status(400).render("games/newGameForm", {
      errors: errors.array(),
      genre,
      genres,
      platforms,
      released,
      selectedPlatforms,
      title,
    });
  } else {
    const { genre, platforms, released, title } = req.body as GameData;
    const platformsArray = Array.isArray(platforms) ? platforms : [platforms];
    await postNewGame(title, released, genre, platformsArray);

    res.redirect("/");
  }
}

export {
  changeGameDetails,
  removeGame,
  renderEditGameForm,
  renderGamePage,
  renderIndexPage,
  renderNewGameForm,
  submitNewGame,
};
