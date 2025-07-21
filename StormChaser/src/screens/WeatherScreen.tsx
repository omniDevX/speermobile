import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DynamicBackground } from '../components/DynamicBackground';
import { WeatherCard } from '../components/WeatherCard';
import { darkTheme, lightTheme } from '../constants/theme';
import { useWeather } from '../hooks/useWeather';

interface WeatherScreenProps {
  navigation: any;
}

export const WeatherScreen: React.FC<WeatherScreenProps> = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  
  const {
    currentWeather,
    forecast,
    location,
    loading,
    error,
    refreshWeather,
    refreshLocation,
  } = useWeather();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshLocation();
    } catch (err) {
      Alert.alert('Error', 'Failed to refresh weather data');
    } finally {
      setRefreshing(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: currentTheme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: currentTheme.colors.border,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: currentTheme.spacing.xs,
    },
    locationText: {
      fontSize: 14,
      color: currentTheme.colors.textSecondary,
      marginLeft: currentTheme.spacing.xs,
    },
    content: {
      flex: 1,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: currentTheme.spacing.xl,
    },
    errorText: {
      fontSize: 16,
      color: currentTheme.colors.error,
      textAlign: 'center',
      marginBottom: currentTheme.spacing.md,
    },
    retryButton: {
      backgroundColor: currentTheme.colors.primary,
      paddingHorizontal: currentTheme.spacing.lg,
      paddingVertical: currentTheme.spacing.md,
      borderRadius: currentTheme.borderRadius.md,
    },
    retryButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 16,
      color: currentTheme.colors.textSecondary,
      marginTop: currentTheme.spacing.md,
    },
    forecastContainer: {
      padding: currentTheme.spacing.md,
    },
    forecastTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
      marginBottom: currentTheme.spacing.md,
    },
    forecastItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: currentTheme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: currentTheme.colors.border,
    },
    forecastDate: {
      fontSize: 16,
      color: currentTheme.colors.text,
      flex: 1,
    },
    forecastWeather: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    forecastIcon: {
      fontSize: 20,
      marginRight: currentTheme.spacing.sm,
    },
    forecastDescription: {
      fontSize: 14,
      color: currentTheme.colors.textSecondary,
      flex: 1,
    },
    forecastTemp: {
      fontSize: 16,
      fontWeight: '600',
      color: currentTheme.colors.text,
    },
  });

  if (loading && !currentWeather) {
    return (
      <DynamicBackground weather={null}>
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading weather data...</Text>
          </View>
        </SafeAreaView>
      </DynamicBackground>
    );
  }

  if (error && !currentWeather) {
    return (
      <DynamicBackground weather={null}>
        <SafeAreaView style={styles.container}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {error}
            </Text>
            <TouchableOpacity style={styles.retryButton} onPress={refreshLocation}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </DynamicBackground>
    );
  }

  return (
    <DynamicBackground weather={currentWeather}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Weather</Text>
            {location && (
              <View style={styles.locationContainer}>
                <Ionicons 
                  name="location" 
                  size={16} 
                  color={currentTheme.colors.textSecondary} 
                />
                <Text style={styles.locationText}>
                  {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={refreshWeather}>
            <Ionicons 
              name="refresh" 
              size={24} 
              color={currentTheme.colors.primary} 
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {currentWeather && (
            <WeatherCard weather={currentWeather} theme={theme} />
          )}

          {forecast.length > 0 && (
            <View style={styles.forecastContainer}>
              <Text style={styles.forecastTitle}>7-Day Forecast</Text>
              {forecast.map((day, index) => (
                <View key={index} style={styles.forecastItem}>
                  <Text style={styles.forecastDate}>
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Text>
                  <View style={styles.forecastWeather}>
                    <Text style={styles.forecastIcon}>{day.weatherIcon}</Text>
                    <Text style={styles.forecastDescription}>
                      {day.weatherDescription}
                    </Text>
                  </View>
                  <Text style={styles.forecastTemp}>
                    {day.temperature.min.toFixed(0)}° / {day.temperature.max.toFixed(0)}°
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </DynamicBackground>
  );
}; 