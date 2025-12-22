import { Request, Response } from "express";
import { validationResult } from "express-validator";

import type { GameData } from "../types/types.js";

import {
  deleteGenre,
  getAllGenres,
  getGamesByGenre,
  getGenreById,
  postNewGenre,
  updateGenreName,
} from "../db/queries.js";

async function changeGenreName(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const genre = await getGenreById(req.params.id);
    res.render("genres/genreEditForm", {
      errors: errors.array(),
      genre: { genre, name: (req.body as GameData).name },
    });
    return;
  }

  const genreId = req.params.id;
  const newGenreName = (req.body as GameData).name;
  await updateGenreName(genreId, newGenreName);
  res.redirect("/genres");
}

async function removeGenre(req: Request, res: Response) {
  const genreId = req.params.id;
  await deleteGenre(genreId);
  res.redirect("/genres");
}

async function renderEditGenreForm(req: Request, res: Response) {
  const genre = await getGenreById(req.params.id);
  res.render("genres/genreEditForm", { genre });
}

async function renderGamesByGenre(req: Request, res: Response) {
  const games = await getGamesByGenre(req.params.id);
  const genre = await getGenreById(req.params.id);
  res.render("genres/genre", { games, genre });
}

async function renderGenresPage(_req: Request, res: Response) {
  const genres = await getAllGenres();
  res.render("genres/genres", { genres });
}

function renderNewGenreForm(_req: Request, res: Response) {
  res.render("genres/newGenreForm", { genre: { name: "" } });
}

async function submitNewGenre(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("genres/newGenreForm", {
      errors: errors.array(),
      genre: {
        genre: { name: (req.body as GameData).name },
        name: (req.body as GameData).name,
      },
    });
    return;
  }
  await postNewGenre((req.body as GameData).name);
  res.redirect("/genres");
}

export {
  changeGenreName,
  removeGenre,
  renderEditGenreForm,
  renderGamesByGenre,
  renderGenresPage,
  renderNewGenreForm,
  submitNewGenre,
};
