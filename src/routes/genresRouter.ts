import { Router } from "express";

import {
  changeGenreName,
  removeGenre,
  renderEditGenreForm,
  renderGamesByGenre,
  renderGenresPage,
  renderNewGenreForm,
  submitNewGenre,
} from "../controllers/genresController.js";

const genresRouter = Router();

genresRouter.get("/", renderGenresPage);
genresRouter.get("/new", renderNewGenreForm);
genresRouter.get("/:id", renderGamesByGenre);
genresRouter.get("/:id/edit", renderEditGenreForm);

genresRouter.post("/new", submitNewGenre);
genresRouter.post("/:id/edit", changeGenreName);
genresRouter.post("/:id/delete", removeGenre);

export default genresRouter;
