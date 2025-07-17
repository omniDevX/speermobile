import * as Location from 'expo-location';

export interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  province?: string;
  country?: string;
}

export const requestLocationPermission = async (): Promise<boolean> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
};

export const getCurrentLocation = async (): Promise<LocationData> => {
  const hasPermission = await requestLocationPermission();
  
  if (!hasPermission) {
    throw new Error('Location permission denied');
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