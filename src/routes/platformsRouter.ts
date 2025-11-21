import { Router } from "express";

import {
  renderPlatformsPage,
  renderGamesByPlatform,
} from "../controllers/platformsController.js";

const platformsRouter = Router();

platformsRouter.get("/", renderPlatformsPage);
platformsRouter.get("/:id", renderGamesByPlatform);

export default platformsRouter;
