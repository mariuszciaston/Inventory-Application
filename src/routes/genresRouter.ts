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
import verifyAdminPassword from "../middlewares/adminAuth.js";
import { validateName } from "../middlewares/validator.js";

const genresRouter = Router();

genresRouter.get("/", renderGenresPage);
genresRouter.get("/new", renderNewGenreForm);
genresRouter.get("/:id", renderGamesByGenre);
genresRouter.get("/:id/edit", renderEditGenreForm);

genresRouter.post("/new", validateName, submitNewGenre);
genresRouter.post(
  "/:id/edit",
  validateName,
  verifyAdminPassword,
  changeGenreName,
);
genresRouter.post("/:id/delete", verifyAdminPassword, removeGenre);

export default genresRouter;
