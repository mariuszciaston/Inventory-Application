import { Request, Response } from "express";

import { getUserById } from "../db/queries.js";

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);

    if (!user) {
      res.status(404).render("404", { title: "User not found" });
      return;
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).render("404", { title: "Server error" });
  }
};

export { getUser };
