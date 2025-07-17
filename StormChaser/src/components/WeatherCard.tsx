import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { darkTheme, lightTheme } from '../constants/theme';
import { WeatherData } from '../types';
import {
    formatHumidity,
    formatPressure,
    formatTemperature,
    formatVisibility,
    formatWindSpeed,
    getWindDirection,
} from '../utils/helpers';

interface WeatherCardProps {
  weather: WeatherData;
  theme?: 'light' | 'dark';
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ 
  weather, 
  theme = 'light' 
}) => {
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  const styles = StyleSheet.create({
    container: {
      borderRadius: currentTheme.borderRadius.lg,
      overflow: 'hidden',
      margin: currentTheme.spacing.md,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    gradient: {
      padding: currentTheme.spacing.lg,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: currentTheme.spacing.md,
    },
    temperature: {
      fontSize: 48,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
    },
    weatherIcon: {
      fontSize: 48,
    },
    description: {
      fontSize: 18,
      color: currentTheme.colors.textSecondary,
      marginBottom: currentTheme.spacing.lg,
    },
    detailsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    detailItem: {
      width: '48%',
      marginBottom: currentTheme.spacing.md,
    },
    detailLabel: {
      fontSize: 12,
      color: currentTheme.colors.textSecondary,
      marginBottom: currentTheme.spacing.xs,
    },
    detailValue: {
      fontSize: 16,
      fontWeight: '600',
      color: currentTheme.colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          `${currentTheme.colors.surface}80`, // 40% opacity
          `${currentTheme.colors.background}80` // 40% opacity
        ]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.temperature}>
            {formatTemperature(weather.temperature)}
          </Text>
          <Text style={styles.weatherIcon}>
            {weather.weatherIcon}
          </Text>
        </View>
        
        <Text style={styles.description}>
          {weather.weatherDescription}
        </Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Humidity</Text>
            <Text style={styles.detailValue}>
              {formatHumidity(weather.humidity)}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Wind Speed</Text>
            <Text style={styles.detailValue}>
              {formatWindSpeed(weather.windSpeed)} {getWindDirection(weather.windDirection)}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Pressure</Text>
            <Text style={styles.detailValue}>
              {formatPressure(weather.pressure)}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Visibility</Text>
            <Text style={styles.detailValue}>
              {formatVisibility(weather.visibility)}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}; 