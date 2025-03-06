import * as SQLite from 'expo-sqlite';

// Open the database synchronously
const db = SQLite.openDatabaseSync('guardian.db');

export const initDatabase = async () => {
  try {
    console.log('Initializing database...');
    
    db.execSync(`PRAGMA foreign_keys = ON;`);

    db.execSync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER DEFAULT 0,
        gender TEXT DEFAULT 'Not Set',
        bloodType TEXT DEFAULT 'Not Set',
        weight REAL DEFAULT 0.0,
        height REAL DEFAULT 0.0,
        allergies TEXT DEFAULT '[]'
      );

      CREATE TABLE IF NOT EXISTS emergency_contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        relation TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS emergency_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        type TEXT NOT NULL,
        timestamp INTEGER NOT NULL,
        location TEXT,
        description TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      INSERT OR IGNORE INTO users (id, name, age, gender, bloodType, weight, height, allergies) 
      VALUES (1, 'User', 0, 'Not Set', 'Not Set', 0.0, 0.0, '[]');
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

export default db;
