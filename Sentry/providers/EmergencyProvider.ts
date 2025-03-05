import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

// Content Provider Component
export class EmergencyProvider {
  private static db: SQLite.SQLiteDatabase;

  static async initialize() {
    // Open the database
    this.db = await SQLite.openDatabaseAsync('guardian.db');

    // Execute the table creation query
    await this.db.execAsync(
      `CREATE TABLE IF NOT EXISTS emergency_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        timestamp INTEGER,
        location TEXT,
        audio_uri TEXT
      )`
    );
  }

  static async saveEmergencyLog(data: {
    type: string;
    location: string;
    audioUri?: string;
  }) {
    // Insert a new log into the database
    await this.db.runAsync(
      'INSERT INTO emergency_logs (type, timestamp, location, audio_uri) VALUES (?, ?, ?, ?)',
      [data.type, Date.now(), data.location, data.audioUri || null]
    );
  }

  static async exportEmergencyData() {
    // Fetch all logs from the database
    const result = await this.db.getAllAsync('SELECT * FROM emergency_logs', []);

    // Write the data to a JSON file
    const exportPath = `${FileSystem.documentDirectory}emergency_export.json`;
    await FileSystem.writeAsStringAsync(exportPath, JSON.stringify(result));

    // Share the file if sharing is available
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(exportPath);
      return true;
    }

    return false;
  }
}