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
import { validateName } from "../middlewares/validator.js";

const platformsRouter = Router();

platformsRouter.get("/", renderPlatformsPage);
platformsRouter.get("/new", renderNewPlatformForm);
platformsRouter.get("/:id", renderGamesByPlatform);
platformsRouter.get("/:id/edit", renderEditPlatformForm);

platformsRouter.post("/new", validateName, submitNewPlatform);
platformsRouter.post(
  "/:id/edit",
  validateName,
  verifyAdminPassword,
  changePlatformName,
);
platformsRouter.post("/:id/delete", verifyAdminPassword, removePlatform);

export default platformsRouter;
