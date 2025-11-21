import { Router } from "express";

import { renderGenresPage } from "../controllers/genresController.js";
import { renderGamesByGenre } from "../controllers/genresController.js";

const genresRouter = Router();

genresRouter.get("/", renderGenresPage);
genresRouter.get("/:id", renderGamesByGenre);

export default genresRouter;
