import { Request, Response } from "express";

import { getAllPlatforms } from "../db/queries.js";

async function renderPlatformsPage(_req: Request, res: Response) {
  const platforms = await getAllPlatforms();
  res.render("platforms", { platforms });
}

export { renderPlatformsPage };
