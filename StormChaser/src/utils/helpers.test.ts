import {
  generateId,
  formatTemperature,
  formatWindSpeed,
  formatPressure,
  formatHumidity,
  formatVisibility,
  getWindDirection,
  getStormTypeColor,
  getStormTypeIcon,
  capitalizeFirstLetter,
  truncateText,
} from './helpers';
import { StormType } from '../types';

describe('Helper Functions', () => {
  describe('generateId', () => {
    it('should generate a unique ID', () => {
      const id1 = generateId();
      const id2 = generateId();
      
      expect(id1).toBeDefined();
      expect(id2).toBeDefined();
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
    });
  });

  describe('formatTemperature', () => {
    it('should format temperature correctly', () => {
      expect(formatTemperature(22.5)).toBe('23°C');
      expect(formatTemperature(-5.7)).toBe('-6°C');
      expect(formatTemperature(0)).toBe('0°C');
    });
  });

  describe('formatWindSpeed', () => {
    it('should format wind speed correctly', () => {
      expect(formatWindSpeed(12.3)).toBe('12 km/h');
      expect(formatWindSpeed(0)).toBe('0 km/h');
      expect(formatWindSpeed(45.7)).toBe('46 km/h');
    });
  });

  describe('formatPressure', () => {
    it('should format pressure correctly', () => {
      expect(formatPressure(1013.25)).toBe('1013 hPa');
      expect(formatPressure(1000)).toBe('1000 hPa');
      expect(formatPressure(1025.8)).toBe('1026 hPa');
    });
  });

  describe('formatHumidity', () => {
    it('should format humidity correctly', () => {
      expect(formatHumidity(65)).toBe('65%');
      expect(formatHumidity(0)).toBe('0%');
      expect(formatHumidity(100)).toBe('100%');
    });
  });

  describe('formatVisibility', () => {
    it('should format visibility correctly', () => {
      expect(formatVisibility(5000)).toBe('5.0 km');
      expect(formatVisibility(800)).toBe('800 m');
      expect(formatVisibility(1000)).toBe('1.0 km');
    });
  });

  describe('getWindDirection', () => {
    it('should return correct wind direction', () => {
      expect(getWindDirection(0)).toBe('N');
      expect(getWindDirection(90)).toBe('E');
      expect(getWindDirection(180)).toBe('S');
      expect(getWindDirection(270)).toBe('W');
      expect(getWindDirection(45)).toBe('NE');
    });
  });

  describe('getStormTypeColor', () => {
    it('should return correct colors for storm types', () => {
      expect(getStormTypeColor(StormType.THUNDERSTORM)).toBe('#f59e0b');
      expect(getStormTypeColor(StormType.TORNADO)).toBe('#ef4444');
      expect(getStormTypeColor(StormType.HURRICANE)).toBe('#dc2626');
      expect(getStormTypeColor(StormType.BLIZZARD)).toBe('#3b82f6');
      expect(getStormTypeColor(StormType.DUST_STORM)).toBe('#d97706');
      expect(getStormTypeColor(StormType.HAIL_STORM)).toBe('#7c3aed');
      expect(getStormTypeColor(StormType.OTHER)).toBe('#6b7280');
    });
  });

  describe('getStormTypeIcon', () => {
    it('should return correct icons for storm types', () => {
      expect(getStormTypeIcon(StormType.THUNDERSTORM)).toBe('⚡');
      expect(getStormTypeIcon(StormType.TORNADO)).toBe('🌪️');
      expect(getStormTypeIcon(StormType.HURRICANE)).toBe('🌀');
      expect(getStormTypeIcon(StormType.BLIZZARD)).toBe('❄️');
      expect(getStormTypeIcon(StormType.DUST_STORM)).toBe('🌪️');
      expect(getStormTypeIcon(StormType.HAIL_STORM)).toBe('🧊');
      expect(getStormTypeIcon(StormType.OTHER)).toBe('🌩️');
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('should capitalize first letter', () => {
      expect(capitalizeFirstLetter('hello')).toBe('Hello');
      expect(capitalizeFirstLetter('world')).toBe('World');
      expect(capitalizeFirstLetter('')).toBe('');
    });
  });

  describe('truncateText', () => {
    it('should truncate text correctly', () => {
      expect(truncateText('Hello World', 5)).toBe('Hello...');
      expect(truncateText('Short', 10)).toBe('Short');
      expect(truncateText('', 5)).toBe('');
    });
  });
}); 