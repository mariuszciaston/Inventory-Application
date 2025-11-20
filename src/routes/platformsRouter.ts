import { Router } from "express";

import { renderPlatformsPage } from "../controllers/platformsController.js";

const platformsRouter = Router();

platformsRouter.get("/", renderPlatformsPage);

export default platformsRouter;
