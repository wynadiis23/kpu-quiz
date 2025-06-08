import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Create a db folder if it doesn't exist
const dbDir = path.join(process.cwd(), "db");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}

const dbPath = path.join(dbDir, "quiz.sqlite");
const db = new Database(dbPath);

// Create leaderboard table if it doesn't exist
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS leaderboard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    score INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`
).run();

export default db;
