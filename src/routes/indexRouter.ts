import { Router } from "express";

import { renderIndexPage } from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/", renderIndexPage);

export default indexRouter;
