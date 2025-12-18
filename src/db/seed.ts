#!/usr/bin/env node

import dotenv from "dotenv";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { Client } from "pg";
import { fileURLToPath } from "url";

import { DbRow, GameData } from "../types/types.js";

dotenv.config();

const createTables = `
CREATE TABLE IF NOT EXISTS genres (
  genre_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS developers (
  developer_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS publishers (
  publisher_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS platforms (
  platform_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS games (
  game_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL UNIQUE,
  released INTEGER, 
  genre_id INTEGER REFERENCES genres(genre_id),
  developer_id INTEGER REFERENCES developers(developer_id),
  publisher_id INTEGER REFERENCES publishers(publisher_id),
  platform_id INTEGER REFERENCES platforms(platform_id)
);

CREATE TABLE IF NOT EXISTS game_platforms (
  game_id INTEGER REFERENCES games(game_id),
  platform_id INTEGER REFERENCES platforms(platform_id),
  PRIMARY KEY (game_id, platform_id)
);
`;

const insertData = async (client: Client) => {
  const data = JSON.parse(
    readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "data.json"),
      "utf8",
    ),
  ) as GameData[];

  for (const game of data) {
    await client.query(
      "INSERT INTO genres (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
      [game.genre],
    );
    await client.query(
      "INSERT INTO developers (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
      [game.developer],
    );
    await client.query(
      "INSERT INTO publishers (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
      [game.publisher],
    );

    for (const platform of game.platforms) {
      await client.query(
        "INSERT INTO platforms (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
        [platform],
      );
    }

    const genreResult = await client.query(
      "SELECT genre_id FROM genres WHERE name = $1",
      [game.genre],
    );
    const developerResult = await client.query(
      "SELECT developer_id FROM developers WHERE name = $1",
      [game.developer],
    );
    const publisherResult = await client.query(
      "SELECT publisher_id FROM publishers WHERE name = $1",
      [game.publisher],
    );

    const gameResult = await client.query(
      "INSERT INTO games (title, released, genre_id, developer_id, publisher_id) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (title) DO NOTHING RETURNING game_id",
      [
        game.title,
        game.released,
        (genreResult.rows[0] as DbRow).genre_id,
        (developerResult.rows[0] as DbRow).developer_id,
        (publisherResult.rows[0] as DbRow).publisher_id,
      ],
    );

    if (gameResult.rows.length > 0) {
      const gameId = (gameResult.rows[0] as DbRow).game_id;
      for (const platform of game.platforms) {
        const platformResult = await client.query(
          "SELECT platform_id FROM platforms WHERE name = $1",
          [platform],
        );
        await client.query(
          "INSERT INTO game_platforms (game_id, platform_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
          [gameId, (platformResult.rows[0] as DbRow).platform_id],
        );
      }
    }
  }
};

await (async () => {
  console.log("Connecting...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();

  console.log("Creating tables...");
  await client.query(createTables);

  console.log("Inserting data...");
  await insertData(client);

  await client.end();
  console.log("Seeding done!");
})();
