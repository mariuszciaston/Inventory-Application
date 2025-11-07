import * as db from "./pool.js";

interface User {
  id: string;
  username: string;
}

const getUserById = async (id: string): Promise<undefined | User> => {
  const result: { rows: User[] } = await db.query(
    "SELECT * FROM usernames WHERE id = $1",
    [id],
  );
  return result.rows[0];
};

export { getUserById };
