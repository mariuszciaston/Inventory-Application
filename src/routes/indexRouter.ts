import { Router } from "express";

// import { getIndex } from "../controllers/indexController.js";

const indexRouter = Router();

// indexRouter.get("/", getIndex);

indexRouter.get("/", (_req, res) => {
  res.render("index", { title: "Home Page" });
});

export default indexRouter;
