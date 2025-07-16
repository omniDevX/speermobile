import { StormType } from '../types';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°C`;
};

export const formatWindSpeed = (speed: number): string => {
  return `${Math.round(speed)} km/h`;
};

export const formatPressure = (pressure: number): string => {
  return `${Math.round(pressure)} hPa`;
};

export const formatHumidity = (humidity: number): string => {
  return `${Math.round(humidity)}%`;
};

export const formatVisibility = (visibility: number): string => {
  if (visibility >= 1000) {
    return `${(visibility / 1000).toFixed(1)} km`;
  }
  return `${Math.round(visibility)} m`;
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const getStormTypeColor = (stormType: StormType): string => {
  switch (stormType) {
    case StormType.THUNDERSTORM:
      return '#f59e0b';
    case StormType.TORNADO:
      return '#ef4444';
    case StormType.HURRICANE:
      return '#dc2626';
    case StormType.BLIZZARD:
      return '#3b82f6';
    case StormType.DUST_STORM:
      return '#d97706';
    case StormType.HAIL_STORM:
      return '#7c3aed';
    default:
      return '#6b7280';
  }
};

export const getStormTypeIcon = (stormType: StormType): string => {
  switch (stormType) {
    case StormType.THUNDERSTORM:
      return '⚡';
    case StormType.TORNADO:
      return '🌪️';
    case StormType.HURRICANE:
      return '🌀';
    case StormType.BLIZZARD:
      return '❄️';
    case StormType.DUST_STORM:
      return '🌪️';
    case StormType.HAIL_STORM:
      return '🧊';
    default:
      return '🌩️';
  }
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}; 