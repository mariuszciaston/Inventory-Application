import * as db from "./pool.js";

const getAllGames = async () => {
  const result = await db.query("SELECT * FROM games");
  return result.rows;
};

const getAllGenres = async () => {
  const result = await db.query("SELECT * FROM genres");
  return result.rows;
};

const getAllPlatforms = async () => {
  const result = await db.query("SELECT * FROM platforms");
  return result.rows;
};

export { getAllGames, getAllGenres, getAllPlatforms };
