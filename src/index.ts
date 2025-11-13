import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "url";

import errorHandler from "./middlewares/errorHandler.js";
import indexRouter from "./routes/indexRouter.js";
import userRouter from "./routes/userRouter.js";

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
// app.use("/new", newRouter);
app.use("/user", userRouter);

// app.get("/", (_req, res) => {
//   res.send("Hello World");
// });

app.get("/{*splat}", (_req, res) => {
  res.status(404).render("404", { title: "Page not found" });
});

app.use(errorHandler);

const port = process.env.PORT ?? "3000";

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server running at http://localhost:${port}/`);
});
