import { NextFunction, Request, Response } from "express";

import { AdminPassword } from "../types/types.js";

function verifyAdminPassword(req: Request, res: Response, next: NextFunction) {
  const { adminPassword } = req.body as AdminPassword;

  if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
    return res
      .status(401)
      .send(
        "<script>alert('Invalid admin password'); window.history.back();</script>",
      );
  }

  next();
}

export default verifyAdminPassword;
