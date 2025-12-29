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
import verifyAdminPassword from "../middlewares/adminAuth.js";
import validateId from "../middlewares/validateId.js";
import { validateName } from "../middlewares/validator.js";

const platformsRouter = Router();

platformsRouter.get("/", renderPlatformsPage);
platformsRouter.get("/new", renderNewPlatformForm);
platformsRouter.get("/:id", validateId, renderGamesByPlatform);
platformsRouter.get("/:id/edit", validateId, renderEditPlatformForm);

platformsRouter.post("/new", validateName, submitNewPlatform);
platformsRouter.post(
  "/:id/edit",
  verifyAdminPassword,
  validateId,
  validateName,
  changePlatformName,
);
platformsRouter.post(
  "/:id/delete",
  verifyAdminPassword,
  validateId,
  removePlatform,
);

export default platformsRouter;
