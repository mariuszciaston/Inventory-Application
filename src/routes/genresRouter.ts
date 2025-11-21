import { Router } from "express";

import { renderGenresPage, renderGamesByGenre } from "../controllers/genresController.js";

const genresRouter = Router();

genresRouter.get("/", renderGenresPage);
genresRouter.get("/:id", renderGamesByGenre);

export default genresRouter;
