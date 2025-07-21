import * as SQLite from 'expo-sqlite';
import { StormDocumentation, WeatherData, Location } from '../types';

class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;

  async initDatabase(): Promise<void> {
    try {
      this.db = await SQLite.openDatabaseAsync('stormchaser.db');
      await this.createTables();
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) return;

    const createStormTable = `
      CREATE TABLE IF NOT EXISTS storm_documentation (
        id TEXT PRIMARY KEY,
        photo_uri TEXT NOT NULL,
        temperature REAL NOT NULL,
        feels_like REAL NOT NULL,
        humidity REAL NOT NULL,
        wind_speed REAL NOT NULL,
        wind_direction REAL NOT NULL,
        pressure REAL NOT NULL,
        visibility REAL NOT NULL,
        precipitation REAL NOT NULL,
        weather_description TEXT NOT NULL,
        weather_icon TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        accuracy REAL,
        date_time TEXT NOT NULL,
        notes TEXT NOT NULL,
        storm_type TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `;

    try {
      await this.db.execAsync(createStormTable);
    } catch (error) {
      console.error('Error creating tables:', error);
      throw error;
    }
  }

  async saveStormDocumentation(storm: StormDocumentation): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const query = `
      INSERT OR REPLACE INTO storm_documentation (
        id, photo_uri, temperature, feels_like, humidity, wind_speed, 
        wind_direction, pressure, visibility, precipitation, weather_description, 
        weather_icon, latitude, longitude, accuracy, date_time, notes, 
        storm_type, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      storm.id,
      storm.photoUri,
      storm.weatherConditions.temperature,
      storm.weatherConditions.feelsLike,
      storm.weatherConditions.humidity,
      storm.weatherConditions.windSpeed,
      storm.weatherConditions.windDirection,
      storm.weatherConditions.pressure,
      storm.weatherConditions.visibility,
      storm.weatherConditions.precipitation,
      storm.weatherConditions.weatherDescription,
      storm.weatherConditions.weatherIcon,
      storm.location.latitude,
      storm.location.longitude,
      storm.location.accuracy || null,
      storm.dateTime,
      storm.notes,
      storm.stormType,
      storm.createdAt,
      storm.updatedAt,
    ];

    try {
      await this.db.runAsync(query, values);
    } catch (error) {
      console.error('Error saving storm documentation:', error);
      throw error;
    }
  }

  async getAllStormDocumentations(): Promise<StormDocumentation[]> {
    if (!this.db) throw new Error('Database not initialized');

    const query = 'SELECT * FROM storm_documentation ORDER BY created_at DESC';
    
    try {
      const result = await this.db.getAllAsync(query);
      return result.map(this.mapRowToStormDocumentation);
    } catch (error) {
      console.error('Error fetching storm documentations:', error);
      throw error;
    }
  }

  async getStormDocumentationById(id: string): Promise<StormDocumentation | null> {
    if (!this.db) throw new Error('Database not initialized');

    const query = 'SELECT * FROM storm_documentation WHERE id = ?';
    
    try {
      const result = await this.db.getFirstAsync(query, [id]);
      return result ? this.mapRowToStormDocumentation(result) : null;
    } catch (error) {
      console.error('Error fetching storm documentation by id:', error);
      throw error;
    }
  }

  async deleteStormDocumentation(id: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const query = 'DELETE FROM storm_documentation WHERE id = ?';
    
    try {
      await this.db.runAsync(query, [id]);
    } catch (error) {
      console.error('Error deleting storm documentation:', error);
      throw error;
    }
  }

  private mapRowToStormDocumentation(row: any): StormDocumentation {
    const weatherConditions: WeatherData = {
      temperature: row.temperature,
      feelsLike: row.feels_like,
      humidity: row.humidity,
      windSpeed: row.wind_speed,
      windDirection: row.wind_direction,
      pressure: row.pressure,
      visibility: row.visibility,
      precipitation: row.precipitation,
      weatherDescription: row.weather_description,
      weatherIcon: row.weather_icon,
      timestamp: row.date_time,
    };

    const location: Location = {
      latitude: row.latitude,
      longitude: row.longitude,
      accuracy: row.accuracy,
      timestamp: row.date_time,
    };

    return {
      id: row.id,
      photoUri: row.photo_uri,
      weatherConditions,
      location,
      dateTime: row.date_time,
      notes: row.notes,
      stormType: row.storm_type as any,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}

export const databaseService = new DatabaseService(); 