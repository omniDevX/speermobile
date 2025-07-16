import * as Location from 'expo-location';
import { Location as LocationType } from '../types';

class LocationService {
  async requestLocationPermission(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  }

  async getCurrentLocation(): Promise<LocationType> {
    try {
      const hasPermission = await this.requestLocationPermission();
      
      if (!hasPermission) {
        throw new Error('Location permission not granted');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 10,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy || undefined,
        timestamp: new Date(location.timestamp).toISOString(),
      };
    } catch (error) {
      console.error('Error getting current location:', error);
      // Return a default location (New York City) as fallback
      return {
        latitude: 40.7128,
        longitude: -74.0060,
        accuracy: 1000,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async getLocationName(location: LocationType): Promise<string> {
    try {
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      if (reverseGeocode.length > 0) {
        const address = reverseGeocode[0];
        const parts = [
          address.city,
          address.region,
          address.country,
        ].filter(Boolean);
        
        return parts.join(', ');
      }

      return 'Unknown Location';
    } catch (error) {
      console.error('Error getting location name:', error);
      return 'Unknown Location';
    }
  }

  calculateDistance(location1: LocationType, location2: LocationType): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(location2.latitude - location1.latitude);
    const dLon = this.toRadians(location2.longitude - location1.longitude);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(location1.latitude)) * 
      Math.cos(this.toRadians(location2.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}

export const locationService = new LocationService(); 