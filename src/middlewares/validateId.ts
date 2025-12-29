import { NextFunction, Request, Response } from "express";

function validateId(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  if (!id || isNaN(Number(id))) {
    res.status(404).render("404");
    return;
  }

  next();
}

export default validateId;
