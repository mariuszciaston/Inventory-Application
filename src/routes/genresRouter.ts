import { Router } from "express";

import { renderGenresPage } from "../controllers/genresController.js";

const genresRouter = Router();

genresRouter.get("/", renderGenresPage);

export default genresRouter;
