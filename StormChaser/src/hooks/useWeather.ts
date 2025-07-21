import { useState, useEffect, useCallback } from 'react';
import { WeatherData, Location, WeatherForecast } from '../types';
import { weatherService } from '../services/weather';
import { locationService } from '../services/location';

interface UseWeatherReturn {
  currentWeather: WeatherData | null;
  forecast: WeatherForecast[];
  location: Location | null;
  loading: boolean;
  error: string | null;
  refreshWeather: () => Promise<void>;
  refreshLocation: () => Promise<void>;
}

export const useWeather = (): UseWeatherReturn => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<WeatherForecast[]>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = useCallback(async () => {
    try {
      setError(null);
      const currentLocation = await locationService.getCurrentLocation();
      setLocation(currentLocation);
      return currentLocation;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get location';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const fetchWeather = useCallback(async (currentLocation: Location) => {
    try {
      setError(null);
      const [weatherData, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(currentLocation),
        weatherService.getWeatherForecast(currentLocation),
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
    }
  }, []);

  const refreshWeather = useCallback(async () => {
    if (!location) return;
    
    setLoading(true);
    try {
      await fetchWeather(location);
    } finally {
      setLoading(false);
    }
  }, [location, fetchWeather]);

  const refreshLocation = useCallback(async () => {
    setLoading(true);
    try {
      const currentLocation = await fetchLocation();
      await fetchWeather(currentLocation);
    } finally {
      setLoading(false);
    }
  }, [fetchLocation, fetchWeather]);

  useEffect(() => {
    const initializeWeather = async () => {
      setLoading(true);
      try {
        const currentLocation = await fetchLocation();
        await fetchWeather(currentLocation);
      } catch (err) {
        // Error already set in fetchLocation
      } finally {
        setLoading(false);
      }
    };

    initializeWeather();
  }, [fetchLocation, fetchWeather]);

  return {
    currentWeather,
    forecast,
    location,
    loading,
    error,
    refreshWeather,
    refreshLocation,
  };
}; 