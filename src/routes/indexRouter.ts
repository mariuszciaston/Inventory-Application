import { Router } from "express";

import { renderIndexPage } from "../controllers/indexController.js";
import { renderGamePage } from "../controllers/gamesController.js";

const indexRouter = Router();

indexRouter.get("/", renderIndexPage);
indexRouter.get("/games/:id", renderGamePage);

export default indexRouter;
