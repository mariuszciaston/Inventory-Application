import * as db from "./pool.js";

const getAllGames = async () => {
  const result = await db.query("SELECT * FROM games ORDER BY title");
  return result.rows;
};

const getAllGenres = async () => {
  const result = await db.query("SELECT * FROM genres ORDER BY name");
  return result.rows;
};

const getAllPlatforms = async () => {
  const result = await db.query("SELECT * FROM platforms ORDER BY name");
  return result.rows;
};

const getPlatformById = async (platformId: string) => {
  const result = await db.query(
    `SELECT * FROM platforms WHERE platform_id = $1`,
    [platformId],
  );
  return result.rows[0];
};

const updatePlatformName = async (
  platformId: string,
  newPlatformName: string,
) => {
  return await db.query(
    `UPDATE platforms SET name = $1 WHERE platform_id = $2`,
    [newPlatformName, platformId],
  );
};

const deletePlatform = async (platformId: string) => {
  await db.query(`DELETE FROM game_platforms WHERE platform_id = $1`, [
    platformId,
  ]);
  return await db.query(`DELETE FROM platforms WHERE platform_id = $1`, [
    platformId,
  ]);
};

const getGameDetails = async (gameId: string) => {
  const result = await db.query(
    `SELECT
      games.game_id,
      games.title,
      games.released,
      genres.name AS genre,
      developers.name AS developer,
      publishers.name AS publisher,
      ARRAY_AGG(platforms.name ORDER BY platforms.name) AS platforms
    FROM games
    LEFT JOIN genres ON games.genre_id = genres.genre_id
    LEFT JOIN developers ON games.developer_id = developers.developer_id
    LEFT JOIN publishers ON games.publisher_id = publishers.publisher_id
    LEFT JOIN game_platforms ON games.game_id = game_platforms.game_id
    LEFT JOIN platforms ON game_platforms.platform_id = platforms.platform_id
    WHERE games.game_id = $1
    GROUP BY games.game_id, genres.name, developers.name, publishers.name`,
    [gameId],
  );

  return result.rows[0];
};

const getGamesByGenre = async (genreId: string) => {
  const result = await db.query(
    `SELECT
      games.game_id,
      games.title,
      games.released,
      genres.name AS genre,
      developers.name AS developer,
      publishers.name AS publisher,
      ARRAY_AGG(platforms.name ORDER BY platforms.name) AS platforms
    FROM games
    LEFT JOIN genres ON games.genre_id = genres.genre_id
    LEFT JOIN developers ON games.developer_id = developers.developer_id
    LEFT JOIN publishers ON games.publisher_id = publishers.publisher_id
    LEFT JOIN game_platforms ON games.game_id = game_platforms.game_id
    LEFT JOIN platforms ON game_platforms.platform_id = platforms.platform_id
    WHERE genres.genre_id = $1
    GROUP BY
      games.game_id,
      games.title,
      games.released,
      genres.name,
      developers.name,
      publishers.name
    ORDER BY games.title`,
    [genreId],
  );

  return result.rows;
};

const getGamesByPlatform = async (platformId: string) => {
  const result = await db.query(
    `SELECT
      games.game_id,
      games.title,
      games.released,
      genres.name AS genre,
      developers.name AS developer,
      publishers.name AS publisher,
      ARRAY_AGG(platforms.name ORDER BY platforms.name) AS platforms
    FROM games
    LEFT JOIN genres ON games.genre_id = genres.genre_id
    LEFT JOIN developers ON games.developer_id = developers.developer_id
    LEFT JOIN publishers ON games.publisher_id = publishers.publisher_id
    LEFT JOIN game_platforms ON games.game_id = game_platforms.game_id
    LEFT JOIN platforms ON game_platforms.platform_id = platforms.platform_id
    WHERE games.game_id IN (
      SELECT game_platforms.game_id
      FROM game_platforms
      WHERE game_platforms.platform_id = $1
    )
    GROUP BY games.game_id, genres.name, developers.name, publishers.name
    ORDER BY games.title`,
    [platformId],
  );
  return result.rows;
};

const postNewPlatform = async (name: string) => {
  return await db.query(`INSERT INTO platforms (name) VALUES ($1)`, [name]);
};

export {
  getAllGames,
  getAllGenres,
  getAllPlatforms,
  getPlatformById,
  updatePlatformName,
  deletePlatform,
  getGameDetails,
  getGamesByGenre,
  getGamesByPlatform,
  postNewPlatform,
};
