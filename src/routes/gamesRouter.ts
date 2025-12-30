import { Router } from "express";

import {
  changeGameDetails,
  removeGame,
  renderEditGameForm,
  renderGamePage,
  renderGamesPage,
  renderNewGameForm,
  submitNewGame,
} from "../controllers/gamesController.js";
import verifyAdminPassword from "../middlewares/adminAuth.js";
import validateId from "../middlewares/validateId.js";
import { validateGame } from "../middlewares/validator.js";

const gamesRouter = Router();

gamesRouter.get("/", renderGamesPage);
gamesRouter.get("/new", renderNewGameForm);
gamesRouter.get("/:id", validateId, renderGamePage);
gamesRouter.get("/:id/edit", validateId, renderEditGameForm);

gamesRouter.post("/new", validateGame, submitNewGame);
gamesRouter.post(
  "/:id/edit",
  verifyAdminPassword,
  validateId,
  validateGame,
  changeGameDetails,
);
gamesRouter.post("/:id/delete", verifyAdminPassword, validateId, removeGame);

export default gamesRouter;
