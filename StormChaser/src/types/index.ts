export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  weatherDescription: string;
  weatherIcon: string;
  timestamp: string;
}

export interface ForecastData {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  weatherDescription: string;
  weatherIcon: string;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  province?: string;
  country?: string;
}

export interface StormDocumentation {
  id: string;
  stormType: string;
  photoUri: string;
  location: LocationData;
  weather: WeatherData;
  notes: string;
  timestamp: string;
  metadata: {
    deviceModel: string;
    appVersion: string;
    photoSize: number;
  };
}

export enum StormType {
  THUNDERSTORM = 'Thunderstorm',
  TORNADO = 'Tornado',
  HURRICANE = 'Hurricane',
  BLIZZARD = 'Blizzard',
  DUST_STORM = 'Dust Storm',
  HAIL_STORM = 'Hail Storm',
  OTHER = 'Other'
}

export interface WeatherForecast {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  weatherDescription: string;
  weatherIcon: string;
  precipitation: number;
  windSpeed: number;
}

export interface AppTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    error: string;
    success: string;
    warning: string;
    border: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
}

export interface NavigationProps {
  navigation: any;
  route: any;
} 