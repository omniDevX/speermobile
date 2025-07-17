import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { darkTheme, lightTheme } from '../constants/theme';
import { StormDocumentation } from '../types';
import { formatDate, getStormTypeIcon } from '../utils/helpers';

interface StormCardProps {
  storm: StormDocumentation;
  theme?: 'light' | 'dark';
  onPress?: () => void;
  onDelete?: () => void;
}

export const StormCard: React.FC<StormCardProps> = ({ 
  storm, 
  theme = 'light',
  onPress,
  onDelete,
}) => {
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  const getLocationDisplay = () => {
    if (storm.location.city && storm.location.province) {
      return `${storm.location.city}, ${storm.location.province}`;
    } else if (storm.location.city) {
      return storm.location.city;
    } else {
      return `${storm.location.latitude.toFixed(4)}, ${storm.location.longitude.toFixed(4)}`;
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: `${currentTheme.colors.surface}CC`, // 80% opacity
      borderRadius: currentTheme.borderRadius.md,
      margin: currentTheme.spacing.sm,
      overflow: 'hidden',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    content: {
      flexDirection: 'row',
      padding: currentTheme.spacing.md,
    },
    imageContainer: {
      width: 80,
      height: 80,
      borderRadius: currentTheme.borderRadius.sm,
      overflow: 'hidden',
      marginRight: currentTheme.spacing.md,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    infoContainer: {
      flex: 1,
      justifyContent: 'space-between',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: currentTheme.spacing.xs,
    },
    stormType: {
      fontSize: 16,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
      marginRight: currentTheme.spacing.xs,
    },
    stormIcon: {
      fontSize: 20,
    },
    date: {
      fontSize: 12,
      color: currentTheme.colors.textSecondary,
      marginBottom: currentTheme.spacing.xs,
    },
    location: {
      fontSize: 12,
      color: currentTheme.colors.textSecondary,
      marginBottom: currentTheme.spacing.xs,
    },
    weatherInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: currentTheme.spacing.xs,
    },
    weatherIcon: {
      fontSize: 16,
      marginRight: currentTheme.spacing.xs,
    },
    weatherText: {
      fontSize: 14,
      color: currentTheme.colors.textSecondary,
    },
    temperature: {
      fontSize: 14,
      fontWeight: '600',
      color: currentTheme.colors.text,
    },
    notes: {
      fontSize: 12,
      color: currentTheme.colors.textSecondary,
      fontStyle: 'italic',
    },
    deleteButton: {
      position: 'absolute',
      top: currentTheme.spacing.xs,
      right: currentTheme.spacing.xs,
      backgroundColor: currentTheme.colors.error,
      borderRadius: 12,
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      {onDelete && (
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteText}>×</Text>
        </TouchableOpacity>
      )}
      
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: storm.photoUri }} 
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.infoContainer}>
          <View>
            <View style={styles.header}>
              <Text style={styles.stormType}>{storm.stormType}</Text>
              <Text style={styles.stormIcon}>
                {getStormTypeIcon(storm.stormType)}
              </Text>
            </View>
            
            <Text style={styles.date}>
              {formatDate(storm.timestamp)}
            </Text>
            
            <Text style={styles.location}>
              📍 {getLocationDisplay()}
            </Text>
            
            <View style={styles.weatherInfo}>
              <Text style={styles.weatherIcon}>
                {storm.weather.weatherIcon}
              </Text>
              <Text style={styles.weatherText}>
                {storm.weather.weatherDescription}
              </Text>
            </View>
            
            <Text style={styles.temperature}>
              {(storm.weather.temperature ?? 0).toFixed(1)}°C
            </Text>
          </View>
          
          {storm.notes && (
            <Text style={styles.notes} numberOfLines={2}>
              {storm.notes}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}; 