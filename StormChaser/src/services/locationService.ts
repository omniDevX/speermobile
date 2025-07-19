import * as Location from 'expo-location';

export interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  province?: string;
  country?: string;
}

export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
};

export const getCurrentLocation = async (): Promise<LocationData> => {
  try {
    const hasPermission = await requestLocationPermission();
    
    if (!hasPermission) {
      // Return default location instead of throwing error
      console.warn('Location permission denied, using default location');
      return {
        latitude: 40.7128, // New York City
        longitude: -74.0060,
        city: 'New York',
        province: 'NY',
        country: 'United States',
      };
    }

    // Check if location services are enabled
    const isEnabled = await Location.hasServicesEnabledAsync();
    if (!isEnabled) {
      console.warn('Location services disabled, using default location');
      return {
        latitude: 40.7128,
        longitude: -74.0060,
        city: 'New York',
        province: 'NY',
        country: 'United States',
      };
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const { latitude, longitude } = location.coords;

    // Get reverse geocoding information
    let city, province, country;
    try {
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (reverseGeocode.length > 0) {
        const address = reverseGeocode[0];
        city = address.city || address.subregion || undefined;
        province = address.region || address.subregion || undefined;
        country = address.country || undefined;
      }
    } catch (error) {
      console.warn('Reverse geocoding failed:', error);
      // Continue without city/province info
    }

    return {
      latitude,
      longitude,
      city,
      province,
      country,
    };
  } catch (error) {
    console.error('Error getting current location:', error);
    // Return default location instead of throwing
    return {
      latitude: 40.7128,
      longitude: -74.0060,
      city: 'New York',
      province: 'NY',
      country: 'United States',
    };
  }
};

export const getLocationFromCoords = async (
  latitude: number, 
  longitude: number
): Promise<LocationData> => {
  let city, province, country;
  
  try {
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (reverseGeocode.length > 0) {
      const address = reverseGeocode[0];
      city = address.city || address.subregion || undefined;
      province = address.region || address.subregion || undefined;
      country = address.country || undefined;
    }
  } catch (error) {
    console.warn('Reverse geocoding failed:', error);
  }

  return {
    latitude,
    longitude,
    city,
    province,
    country,
  };
}; 