import { Router } from "express";

import {
  changePlatformName,
  removePlatform,
  renderEditPlatformForm,
  renderGamesByPlatform,
  renderNewPlatformForm,
  renderPlatformsPage,
  submitNewPlatform,
} from "../controllers/platformsController.js";

const platformsRouter = Router();

platformsRouter.get("/", renderPlatformsPage);
platformsRouter.get("/new", renderNewPlatformForm);
platformsRouter.get("/:id", renderGamesByPlatform);
platformsRouter.get("/:id/edit", renderEditPlatformForm);

platformsRouter.post("/new", submitNewPlatform);
platformsRouter.post("/:id/edit", changePlatformName);
platformsRouter.post("/:id/delete", removePlatform);

export default platformsRouter;
