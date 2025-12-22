import { Request, Response } from "express";

import type { AdminPassword, GameData } from "../types/types.js";

import {
  deleteGenre,
  getAllGenres,
  getGamesByGenre,
  getGenreById,
  postNewGenre,
  updateGenreName,
} from "../db/queries.js";

async function changeGenreName(req: Request, res: Response) {
  const { adminPassword } = req.body as AdminPassword;
  if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
    return res
      .status(401)
      .send(
        "<script>alert('Invalid admin password'); window.history.back();</script>",
      );
  }

  const genreId = req.params.id;
  const newGenreName = (req.body as GameData).name;
  await updateGenreName(genreId, newGenreName);
  res.redirect("/genres");
}

async function removeGenre(req: Request, res: Response) {
  const { adminPassword } = req.body as AdminPassword;
  if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
    return res
      .status(401)
      .send(
        "<script>alert('Invalid admin password'); window.history.back();</script>",
      );
  }

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
  res.render("genres/newGenreForm");
}

async function submitNewGenre(req: Request, res: Response) {
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
