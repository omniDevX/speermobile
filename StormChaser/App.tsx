import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ErrorBoundary } from './src/components/ErrorBoundary';
import { darkTheme, lightTheme } from './src/constants/theme';
import { SettingsProvider } from './src/contexts/SettingsContext';
import { CaptureStormScreen } from './src/screens/CaptureStormScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { StormDetailScreen } from './src/screens/StormDetailScreen';
import { StormDocumentationScreen } from './src/screens/StormDocumentationScreen';
import { WeatherScreen } from './src/screens/WeatherScreen';
import { databaseService } from './src/services/database';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1a1a2e',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

const StormStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="StormList" component={StormDocumentationScreen} />
      <Stack.Screen name="CaptureStorm" component={CaptureStormScreen} />
      <Stack.Screen name="StormDetail" component={StormDetailScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Weather') {
            iconName = focused ? 'partly-sunny' : 'partly-sunny-outline';
          } else if (route.name === 'Storms') {
            iconName = focused ? 'thunderstorm' : 'thunderstorm-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: currentTheme.colors.primary,
        tabBarInactiveTintColor: currentTheme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: currentTheme.colors.surface,
          borderTopColor: currentTheme.colors.border,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Weather" 
        component={WeatherScreen}
        options={{
          title: 'Weather',
        }}
      />
      <Tab.Screen 
        name="Storms" 
        component={StormStack}
        options={{
          title: 'Storm Documentation',
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize database
        await databaseService.initDatabase();
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setInitError(error instanceof Error ? error.message : 'Initialization failed');
        // Still set as initialized to show error UI
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, []);

  if (!isInitialized) {
    return (
      <SafeAreaProvider>
        <View style={[styles.errorContainer, { backgroundColor: currentTheme.colors.background }]}>
          <Text style={[styles.errorTitle, { color: currentTheme.colors.text }]}>
            Initializing...
          </Text>
        </View>
      </SafeAreaProvider>
    );
  }

  if (initError) {
    return (
      <SafeAreaProvider>
        <View style={[styles.errorContainer, { backgroundColor: currentTheme.colors.background }]}>
          <Text style={[styles.errorTitle, { color: currentTheme.colors.text }]}>
            Initialization Error
          </Text>
          <Text style={[styles.errorText, { color: currentTheme.colors.textSecondary }]}>
            {initError}
          </Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: currentTheme.colors.primary }]}
            onPress={() => window.location.reload()}
          >
            <Text style={styles.retryButtonText}>Restart App</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <ErrorBoundary>
      <SettingsProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            <TabNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </SettingsProvider>
    </ErrorBoundary>
  );
}
