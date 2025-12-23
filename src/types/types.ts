interface AdminPassword {
  adminPassword: string;
}

interface DbRow {
  developer_id: number;
  game_id: number;
  genre_id: number;
  platform_id: number;
  publisher_id: number;
}

interface GameData {
  developer: string;
  genre: string;
  image: string;
  name: string;
  platforms: number[];
  publisher: string;
  released: number;
  title: string;
}

export { AdminPassword, DbRow, GameData };
