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
import { validate } from "../middlewares/validator.js";

const indexRouter = Router();

indexRouter.get("/", renderIndexPage);
indexRouter.get("/new", renderNewGameForm);
indexRouter.get("/games/:id", renderGamePage);
indexRouter.get("/games/:id/edit", renderEditGameForm);

indexRouter.post("/games/new", validate, submitNewGame);
indexRouter.post("/games/:id/edit", validate, changeGameDetails);
indexRouter.post("/games/:id/delete", removeGame);

export default indexRouter;
