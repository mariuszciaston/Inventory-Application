import { Router } from "express";

import {
  changeGameDetails,
  removeGame,
  renderEditGameForm,
  renderGamePage,
  renderIndexPage,
  renderNewGameForm,
  submitNewGame,
} from "../controllers/indexController.js";
import verifyAdminPassword from "../middlewares/adminAuth.js";
import { validateGame } from "../middlewares/validator.js";

const indexRouter = Router();

indexRouter.get("/", renderIndexPage);
indexRouter.get("/games/new", renderNewGameForm);
indexRouter.get("/games/:id", renderGamePage);
indexRouter.get("/games/:id/edit", renderEditGameForm);

indexRouter.post("/games/new", validateGame, submitNewGame);
indexRouter.post(
  "/games/:id/edit",
  verifyAdminPassword,
  validateGame,
  changeGameDetails,
);
indexRouter.post("/games/:id/delete", verifyAdminPassword, removeGame);

export default indexRouter;
