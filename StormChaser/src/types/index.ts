export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  precipitation: number;
  weatherDescription: string;
  weatherIcon: string;
  timestamp: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: string;
}

export interface StormDocumentation {
  id: string;
  photoUri: string;
  weatherConditions: WeatherData;
  location: Location;
  dateTime: string;
  notes: string;
  stormType: StormType;
  createdAt: string;
  updatedAt: string;
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