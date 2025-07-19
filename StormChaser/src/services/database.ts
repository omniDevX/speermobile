import * as SQLite from 'expo-sqlite';
import { LocationData, StormDocumentation, WeatherData } from '../types';

class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;
  private isInitialized = false;

  async initDatabase(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      this.db = await SQLite.openDatabaseAsync('stormchaser.db');
      await this.createTables();
      this.isInitialized = true;
    } catch (error) {
      console.error('Error initializing database:', error);
      // Don't throw error, just log it and continue
      // The app can still function without database
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) return;

    const createStormTable = `
      CREATE TABLE IF NOT EXISTS storm_documentation (
        id TEXT PRIMARY KEY,
        photo_uri TEXT NOT NULL,
        temperature REAL NOT NULL,
        humidity REAL NOT NULL,
        wind_speed REAL NOT NULL,
        wind_direction REAL NOT NULL,
        pressure REAL NOT NULL,
        visibility REAL NOT NULL,
        weather_description TEXT NOT NULL,
        weather_icon TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        city TEXT,
        province TEXT,
        country TEXT,
        timestamp TEXT NOT NULL,
        notes TEXT NOT NULL,
        storm_type TEXT NOT NULL,
        device_model TEXT,
        app_version TEXT,
        photo_size INTEGER
      );
    `;

    try {
      await this.db.execAsync(createStormTable);
    } catch (error) {
      console.error('Error creating tables:', error);
      // Don't throw error, just log it
    }
  }

  async saveStormDocumentation(storm: StormDocumentation): Promise<void> {
    if (!this.db || !this.isInitialized) {
      console.warn('Database not available, skipping save');
      return;
    }

    const query = `
      INSERT OR REPLACE INTO storm_documentation (
        id, photo_uri, temperature, humidity, wind_speed, 
        wind_direction, pressure, visibility, weather_description, 
        weather_icon, latitude, longitude, city, province, country,
        timestamp, notes, storm_type, device_model, app_version, photo_size
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      storm.id,
      storm.photoUri,
      storm.weather.temperature,
      storm.weather.humidity,
      storm.weather.windSpeed,
      storm.weather.windDirection,
      storm.weather.pressure,
      storm.weather.visibility,
      storm.weather.weatherDescription,
      storm.weather.weatherIcon,
      storm.location.latitude,
      storm.location.longitude,
      storm.location.city || null,
      storm.location.province || null,
      storm.location.country || null,
      storm.timestamp,
      storm.notes,
      storm.stormType,
      storm.metadata.deviceModel,
      storm.metadata.appVersion,
      storm.metadata.photoSize,
    ];

    try {
      await this.db.runAsync(query, values);
    } catch (error) {
      console.error('Error saving storm documentation:', error);
      // Don't throw error, just log it
    }
  }

  async getAllStormDocumentations(): Promise<StormDocumentation[]> {
    if (!this.db || !this.isInitialized) {
      console.warn('Database not available, returning empty array');
      return [];
    }

    const query = 'SELECT * FROM storm_documentation ORDER BY timestamp DESC';
    
    try {
      const result = await this.db.getAllAsync(query);
      return result.map(this.mapRowToStormDocumentation);
    } catch (error) {
      console.error('Error fetching storm documentations:', error);
      return [];
    }
  }

  async getStormDocumentationById(id: string): Promise<StormDocumentation | null> {
    if (!this.db || !this.isInitialized) {
      console.warn('Database not available, returning null');
      return null;
    }

    const query = 'SELECT * FROM storm_documentation WHERE id = ?';
    
    try {
      const result = await this.db.getFirstAsync(query, [id]);
      return result ? this.mapRowToStormDocumentation(result) : null;
    } catch (error) {
      console.error('Error fetching storm documentation by id:', error);
      return null;
    }
  }

  async deleteStormDocumentation(id: string): Promise<void> {
    if (!this.db || !this.isInitialized) {
      console.warn('Database not available, skipping delete');
      return;
    }

    const query = 'DELETE FROM storm_documentation WHERE id = ?';
    
    try {
      await this.db.runAsync(query, [id]);
    } catch (error) {
      console.error('Error deleting storm documentation:', error);
      // Don't throw error, just log it
    }
  }

  private mapRowToStormDocumentation(row: any): StormDocumentation {
    const weather: WeatherData = {
      temperature: row.temperature,
      humidity: row.humidity,
      windSpeed: row.wind_speed,
      windDirection: row.wind_direction,
      pressure: row.pressure,
      visibility: row.visibility,
      weatherDescription: row.weather_description,
      weatherIcon: row.weather_icon,
      timestamp: row.timestamp,
    };

    const location: LocationData = {
      latitude: row.latitude,
      longitude: row.longitude,
      city: row.city,
      province: row.province,
      country: row.country,
    };

    return {
      id: row.id,
      stormType: row.storm_type,
      photoUri: row.photo_uri,
      location,
      weather,
      notes: row.notes,
      timestamp: row.timestamp,
      metadata: {
        deviceModel: row.device_model || 'Unknown',
        appVersion: row.app_version || '1.0.0',
        photoSize: row.photo_size || 0,
      },
    };
  }
}

export const databaseService = new DatabaseService(); 