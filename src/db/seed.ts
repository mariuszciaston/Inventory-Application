#!/usr/bin/env node

import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255)
);

INSERT INTO usernames (username) 
VALUES
  ('Bryan'),
  ('Odin'),
  ('Damon')
ON CONFLICT DO NOTHING;
`;

await (async () => {
  console.log("Seeding...");
    const client = new Client({
    connectionString:
      process.env.DATABASE_LOCAL_URL ?? process.env.DATABASE_PUBLIC_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done!");
})();
