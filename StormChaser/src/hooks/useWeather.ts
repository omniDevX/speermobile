import { useEffect, useState } from 'react';
import { getCurrentLocation, LocationData } from '../services/locationService';
import { weatherService } from '../services/weather';
import { ForecastData, WeatherData } from '../types';

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const locationData = await getCurrentLocation();
      setLocation(locationData);
      
      // Convert LocationData to the format expected by weather service
      const weatherLocation = {
        latitude: locationData.latitude,
        longitude: locationData.longitude,
      };
      
      const weatherData = await weatherService.getCurrentWeather(weatherLocation);
      setCurrentWeather(weatherData);
      
      const forecastData = await weatherService.getWeatherForecast(weatherLocation);
      // Convert forecast data to match our types
      const convertedForecast: ForecastData[] = forecastData.map(f => ({
        date: f.date,
        temperature: f.temperature,
        weatherDescription: f.weatherDescription,
        weatherIcon: f.weatherIcon,
      }));
      setForecast(convertedForecast);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const refreshWeather = async () => {
    if (!location) return;
    
    try {
      const weatherLocation = {
        latitude: location.latitude,
        longitude: location.longitude,
      };
      
      const weatherData = await weatherService.getCurrentWeather(weatherLocation);
      setCurrentWeather(weatherData);
      
      const forecastData = await weatherService.getWeatherForecast(weatherLocation);
      const convertedForecast: ForecastData[] = forecastData.map(f => ({
        date: f.date,
        temperature: f.temperature,
        weatherDescription: f.weatherDescription,
        weatherIcon: f.weatherIcon,
      }));
      setForecast(convertedForecast);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh weather data');
    }
  };

  useEffect(() => {
    refreshLocation();
  }, []);

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