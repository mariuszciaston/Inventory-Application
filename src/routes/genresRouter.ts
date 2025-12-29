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
import validateId from "../middlewares/validateId.js";
import { validateName } from "../middlewares/validator.js";

const genresRouter = Router();

genresRouter.get("/", renderGenresPage);
genresRouter.get("/new", renderNewGenreForm);
genresRouter.get("/:id", validateId, renderGamesByGenre);
genresRouter.get("/:id/edit", validateId, renderEditGenreForm);

genresRouter.post("/new", validateName, submitNewGenre);
genresRouter.post(
  "/:id/edit",
  verifyAdminPassword,
  validateId,
  validateName,
  changeGenreName,
);
genresRouter.post("/:id/delete", verifyAdminPassword, validateId, removeGenre);

export default genresRouter;
