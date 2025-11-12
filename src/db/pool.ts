import dotenv from "dotenv";
import { Pool, QueryResultRow } from "pg";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const query = async <T extends QueryResultRow>(
  text: string,
  params?: unknown[],
) => {
  return pool.query<T>(text, params);
};

export { query };
