import { Request, Response } from "express";

import {
  getAllGenres,
  getGamesByGenre,
  getGenreById,
  postNewGenre,
  updateGenreName,
  deleteGenre,
} from "../db/queries.js";

async function renderGenresPage(_req: Request, res: Response) {
  const genres = await getAllGenres();
  res.render("genres/genres", { genres });
}

async function renderGamesByGenre(req: Request, res: Response) {
  const games = await getGamesByGenre(req.params.id);
  const genre = await getGenreById(req.params.id);
  res.render("genres/genre", { games, genreName: genre.name, genre });
}

async function renderNewGenreForm(_req: Request, res: Response) {
  res.render("genres/newGenreForm");
}

async function submitNewGenre(req: Request, res: Response) {
  await postNewGenre(req.body.name);
  res.redirect("/genres");
}

async function renderEditGenreForm(req: Request, res: Response) {
  const genre = await getGenreById(req.params.id);
  res.render("genres/genreEditForm", { genre });
}

async function changeGenreName(req: Request, res: Response) {
  const genreId = req.params.id;
  const newGenreName = req.body.name;
  await updateGenreName(genreId, newGenreName);
  res.redirect("/genres");
}

async function removeGenre(req: Request, res: Response) {
  const genreId = req.params.id;
  await deleteGenre(genreId);
  res.redirect("/genres");
}

export {
  renderGenresPage,
  renderGamesByGenre,
  renderNewGenreForm,
  renderEditGenreForm,
  submitNewGenre,
  changeGenreName,
  removeGenre,
};
