import * as db from "./pool.js";

const getAllGames = async () => {
  const result = await db.query("SELECT * FROM games");
  return result.rows;
};

export { getAllGames };
