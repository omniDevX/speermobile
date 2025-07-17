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

export const formatForecastDate = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00');
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  // Check if it's today or tomorrow
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }
};

export const formatTemperature = (temp: number | undefined | null): string => {
  if (temp === undefined || temp === null) return 'N/A';
  return `${Math.round(temp)}°C`;
};

export const formatWindSpeed = (speed: number | undefined | null): string => {
  if (speed === undefined || speed === null) return 'N/A';
  return `${Math.round(speed)} km/h`;
};

export const formatPressure = (pressure: number | undefined | null): string => {
  if (pressure === undefined || pressure === null) return 'N/A';
  return `${Math.round(pressure)} hPa`;
};

export const formatHumidity = (humidity: number | undefined | null): string => {
  if (humidity === undefined || humidity === null) return 'N/A';
  return `${Math.round(humidity)}%`;
};

export const formatVisibility = (visibility: number | undefined | null): string => {
  if (visibility === undefined || visibility === null) return 'N/A';
  if (visibility >= 1000) {
    return `${(visibility / 1000).toFixed(1)} km`;
  }
  return `${Math.round(visibility)} m`;
};

export const getWindDirection = (degrees: number | undefined | null): string => {
  if (degrees === undefined || degrees === null) return 'N/A';
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

const getStormTypeEnum = (stormType: string): StormType => {
  switch (stormType.toLowerCase()) {
    case 'thunderstorm':
      return StormType.THUNDERSTORM;
    case 'tornado':
      return StormType.TORNADO;
    case 'hurricane':
      return StormType.HURRICANE;
    case 'blizzard':
      return StormType.BLIZZARD;
    case 'dust storm':
      return StormType.DUST_STORM;
    case 'hail storm':
      return StormType.HAIL_STORM;
    default:
      return StormType.OTHER;
  }
};

export const getStormTypeColor = (stormType: string): string => {
  const enumType = getStormTypeEnum(stormType);
  switch (enumType) {
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

export const getStormTypeIcon = (stormType: string): string => {
  const enumType = getStormTypeEnum(stormType);
  switch (enumType) {
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