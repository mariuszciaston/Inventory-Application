import { NextFunction, Request, Response } from "express";

import { AdminPassword } from "../types/types.js";

function verifyAdminPassword(req: Request, res: Response, next: NextFunction) {
  const { adminPassword } = req.body as AdminPassword;
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || adminPassword !== correctPassword) {
    return res.status(401).json({ error: "Invalid admin password" });
  }

  next();
}

export default verifyAdminPassword;
