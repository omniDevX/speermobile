import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StormCard } from '../components/StormCard';
import { useStormDocumentation } from '../hooks/useStormDocumentation';
import { lightTheme, darkTheme } from '../constants/theme';
import { useColorScheme } from 'react-native';
import { StormDocumentation } from '../types';

interface StormDocumentationScreenProps {
  navigation: any;
}

export const StormDocumentationScreen: React.FC<StormDocumentationScreenProps> = ({ 
  navigation 
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  
  const {
    storms,
    loading,
    error,
    deleteStorm,
    refreshStorms,
  } = useStormDocumentation();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshStorms();
    } catch (err) {
      Alert.alert('Error', 'Failed to refresh storm data');
    } finally {
      setRefreshing(false);
    }
  };

  const handleDeleteStorm = (storm: StormDocumentation) => {
    Alert.alert(
      'Delete Storm Documentation',
      'Are you sure you want to delete this storm documentation? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteStorm(storm.id);
            } catch (err) {
              Alert.alert('Error', 'Failed to delete storm documentation');
            }
          },
        },
      ]
    );
  };

  const handleStormPress = (storm: StormDocumentation) => {
    navigation.navigate('StormDetail', { storm });
  };

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
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
    },
    addButton: {
      backgroundColor: currentTheme.colors.primary,
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: currentTheme.spacing.xl,
    },
    emptyIcon: {
      fontSize: 64,
      color: currentTheme.colors.textSecondary,
      marginBottom: currentTheme.spacing.md,
    },
    emptyText: {
      fontSize: 18,
      color: currentTheme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: currentTheme.spacing.md,
    },
    emptySubtext: {
      fontSize: 14,
      color: currentTheme.colors.textSecondary,
      textAlign: 'center',
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
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: currentTheme.spacing.md,
      backgroundColor: currentTheme.colors.surface,
      margin: currentTheme.spacing.sm,
      borderRadius: currentTheme.borderRadius.md,
    },
    statItem: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.colors.primary,
    },
    statLabel: {
      fontSize: 12,
      color: currentTheme.colors.textSecondary,
      marginTop: currentTheme.spacing.xs,
    },
  });

  const renderStormItem = ({ item }: { item: StormDocumentation }) => (
    <StormCard
      storm={item}
      theme={theme}
      onPress={() => handleStormPress(item)}
      onDelete={() => handleDeleteStorm(item)}
    />
  );

  if (loading && storms.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading storm data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && storms.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refreshStorms}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Storm Documentation</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CaptureStorm')}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.content}
        data={storms}
        renderItem={renderStormItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          storms.length > 0 ? (
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{storms.length}</Text>
                <Text style={styles.statLabel}>Total Storms</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {storms.filter(s => s.stormType === 'Thunderstorm').length}
                </Text>
                <Text style={styles.statLabel}>Thunderstorms</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {new Set(storms.map(s => new Date(s.dateTime).toDateString())).size}
                </Text>
                <Text style={styles.statLabel}>Days Active</Text>
              </View>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🌩️</Text>
            <Text style={styles.emptyText}>No storm documentation yet</Text>
            <Text style={styles.emptySubtext}>
              Tap the + button to capture your first storm
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}; 