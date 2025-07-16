import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { lightTheme, darkTheme } from '../constants/theme';
import { useColorScheme } from 'react-native';
import { StormDocumentation } from '../types';
import { formatDate, getStormTypeIcon, getStormTypeColor } from '../utils/helpers';
import {
  formatTemperature,
  formatWindSpeed,
  formatPressure,
  formatHumidity,
  formatVisibility,
  getWindDirection,
} from '../utils/helpers';

interface StormDetailScreenProps {
  navigation: any;
  route: {
    params: {
      storm: StormDocumentation;
    };
  };
}

export const StormDetailScreen: React.FC<StormDetailScreenProps> = ({ 
  navigation, 
  route 
}) => {
  const { storm } = route.params;
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
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
      fontSize: 20,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
    },
    backButton: {
      color: currentTheme.colors.primary,
      fontSize: 16,
    },
    content: {
      flex: 1,
    },
    photoContainer: {
      width: '100%',
      height: 300,
      backgroundColor: currentTheme.colors.surface,
    },
    photo: {
      width: '100%',
      height: '100%',
    },
    infoContainer: {
      padding: currentTheme.spacing.md,
    },
    stormHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: currentTheme.spacing.md,
    },
    stormType: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
      marginRight: currentTheme.spacing.sm,
    },
    stormIcon: {
      fontSize: 28,
    },
    date: {
      fontSize: 16,
      color: currentTheme.colors.textSecondary,
      marginBottom: currentTheme.spacing.lg,
    },
    section: {
      marginBottom: currentTheme.spacing.lg,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
      marginBottom: currentTheme.spacing.md,
    },
    weatherCard: {
      backgroundColor: currentTheme.colors.surface,
      padding: currentTheme.spacing.md,
      borderRadius: currentTheme.borderRadius.md,
      marginBottom: currentTheme.spacing.md,
    },
    weatherRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: currentTheme.spacing.sm,
    },
    weatherLabel: {
      fontSize: 14,
      color: currentTheme.colors.textSecondary,
    },
    weatherValue: {
      fontSize: 14,
      fontWeight: '600',
      color: currentTheme.colors.text,
    },
    locationCard: {
      backgroundColor: currentTheme.colors.surface,
      padding: currentTheme.spacing.md,
      borderRadius: currentTheme.borderRadius.md,
      marginBottom: currentTheme.spacing.md,
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: currentTheme.spacing.xs,
    },
    locationIcon: {
      marginRight: currentTheme.spacing.xs,
    },
    locationText: {
      fontSize: 14,
      color: currentTheme.colors.text,
    },
    notesCard: {
      backgroundColor: currentTheme.colors.surface,
      padding: currentTheme.spacing.md,
      borderRadius: currentTheme.borderRadius.md,
    },
    notesText: {
      fontSize: 14,
      color: currentTheme.colors.text,
      lineHeight: 20,
    },
    noNotes: {
      fontSize: 14,
      color: currentTheme.colors.textSecondary,
      fontStyle: 'italic',
    },
    metadataCard: {
      backgroundColor: currentTheme.colors.surface,
      padding: currentTheme.spacing.md,
      borderRadius: currentTheme.borderRadius.md,
      marginTop: currentTheme.spacing.md,
    },
    metadataRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: currentTheme.spacing.xs,
    },
    metadataLabel: {
      fontSize: 12,
      color: currentTheme.colors.textSecondary,
    },
    metadataValue: {
      fontSize: 12,
      color: currentTheme.colors.text,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Storm Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.photoContainer}>
          <Image source={{ uri: storm.photoUri }} style={styles.photo} />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.stormHeader}>
            <Text style={styles.stormType}>{storm.stormType}</Text>
            <Text style={styles.stormIcon}>
              {getStormTypeIcon(storm.stormType)}
            </Text>
          </View>

          <Text style={styles.date}>
            {formatDate(storm.dateTime)}
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Weather Conditions</Text>
            <View style={styles.weatherCard}>
              <View style={styles.weatherRow}>
                <Text style={styles.weatherLabel}>Temperature:</Text>
                <Text style={styles.weatherValue}>
                  {formatTemperature(storm.weatherConditions.temperature)}
                </Text>
              </View>
              <View style={styles.weatherRow}>
                <Text style={styles.weatherLabel}>Feels Like:</Text>
                <Text style={styles.weatherValue}>
                  {formatTemperature(storm.weatherConditions.feelsLike)}
                </Text>
              </View>
              <View style={styles.weatherRow}>
                <Text style={styles.weatherLabel}>Conditions:</Text>
                <Text style={styles.weatherValue}>
                  {storm.weatherConditions.weatherDescription}
                </Text>
              </View>
              <View style={styles.weatherRow}>
                <Text style={styles.weatherLabel}>Wind Speed:</Text>
                <Text style={styles.weatherValue}>
                  {formatWindSpeed(storm.weatherConditions.windSpeed)} {getWindDirection(storm.weatherConditions.windDirection)}
                </Text>
              </View>
              <View style={styles.weatherRow}>
                <Text style={styles.weatherLabel}>Humidity:</Text>
                <Text style={styles.weatherValue}>
                  {formatHumidity(storm.weatherConditions.humidity)}
                </Text>
              </View>
              <View style={styles.weatherRow}>
                <Text style={styles.weatherLabel}>Pressure:</Text>
                <Text style={styles.weatherValue}>
                  {formatPressure(storm.weatherConditions.pressure)}
                </Text>
              </View>
              <View style={styles.weatherRow}>
                <Text style={styles.weatherLabel}>Visibility:</Text>
                <Text style={styles.weatherValue}>
                  {formatVisibility(storm.weatherConditions.visibility)}
                </Text>
              </View>
              <View style={styles.weatherRow}>
                <Text style={styles.weatherLabel}>Precipitation:</Text>
                <Text style={styles.weatherValue}>
                  {storm.weatherConditions.precipitation.toFixed(1)} mm
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.locationCard}>
              <View style={styles.locationRow}>
                <Ionicons 
                  name="location" 
                  size={16} 
                  color={currentTheme.colors.textSecondary}
                  style={styles.locationIcon}
                />
                <Text style={styles.locationText}>
                  {storm.location.latitude.toFixed(6)}, {storm.location.longitude.toFixed(6)}
                </Text>
              </View>
              {storm.location.accuracy && (
                <View style={styles.locationRow}>
                  <Ionicons 
                    name="compass" 
                    size={16} 
                    color={currentTheme.colors.textSecondary}
                    style={styles.locationIcon}
                  />
                  <Text style={styles.locationText}>
                    Accuracy: ±{Math.round(storm.location.accuracy)}m
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <View style={styles.notesCard}>
              {storm.notes ? (
                <Text style={styles.notesText}>{storm.notes}</Text>
              ) : (
                <Text style={styles.noNotes}>No notes added</Text>
              )}
            </View>
          </View>

          <View style={styles.metadataCard}>
            <View style={styles.metadataRow}>
              <Text style={styles.metadataLabel}>Created:</Text>
              <Text style={styles.metadataValue}>
                {formatDate(storm.createdAt)}
              </Text>
            </View>
            <View style={styles.metadataRow}>
              <Text style={styles.metadataLabel}>Last Updated:</Text>
              <Text style={styles.metadataValue}>
                {formatDate(storm.updatedAt)}
              </Text>
            </View>
            <View style={styles.metadataRow}>
              <Text style={styles.metadataLabel}>Documentation ID:</Text>
              <Text style={styles.metadataValue}>
                {storm.id}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}; 