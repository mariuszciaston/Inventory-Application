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
    GROUP BY games.game_id, genres.name, developers.name, publishers.name`,
    [genreId],
  );
  return result.rows;
};

export {
  getAllGames,
  getAllGenres,
  getAllPlatforms,
  getGameDetails,
  getGamesByGenre,
};
