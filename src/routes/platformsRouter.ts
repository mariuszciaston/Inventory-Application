import { Router } from "express";

import {
  renderPlatformsPage,
  renderGamesByPlatform,
  renderNewPlatformForm,
  submitNewPlatform,
} from "../controllers/platformsController.js";

const platformsRouter = Router();

platformsRouter.get("/", renderPlatformsPage);
platformsRouter.get("/new", renderNewPlatformForm);
platformsRouter.get("/:id", renderGamesByPlatform);

platformsRouter.post("/new", submitNewPlatform);

export default platformsRouter;
