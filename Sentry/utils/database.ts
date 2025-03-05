import * as SQLite from 'expo-sqlite';

// Open the database
const db = SQLite.openDatabaseSync('guardian.db');

export const initDatabase = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        gender TEXT,
        bloodType TEXT,
        weight REAL,
        height REAL,
        allergies TEXT
      );
      
      CREATE TABLE IF NOT EXISTS emergency_contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        name TEXT,
        phone TEXT,
        relation TEXT,
        FOREIGN KEY (user_id) REFERENCES users (id)
      );

      CREATE TABLE IF NOT EXISTS emergency_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        type TEXT,
        timestamp INTEGER,
        location TEXT,
        description TEXT,
        FOREIGN KEY (user_id) REFERENCES users (id)
      );
    `);
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default db;
