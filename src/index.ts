import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "url";

import indexRouter from "./routes/indexRouter.js";
// import gamesRouter from "./routes/gamesRouter.js";
// import genresRouter from "./routes/genresRouter.js";
// import platformsRouter from "./routes/platformsRouter.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// EJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// parse body
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", indexRouter);
// app.use("/games", gamesRouter);
// app.use("/genres", genresRouter);
// app.use("/platforms", platformsRouter);

app.get("/{*splat}", (_req, res) => {
  res.status(404).render("404", { title: "Page not found" });
});

app.use(errorHandler);

const port = process.env.PORT ?? "3000";

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server running at http://localhost:${port}/`);
});
