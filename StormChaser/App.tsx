import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { darkTheme, lightTheme } from './src/constants/theme';
import { SettingsProvider } from './src/contexts/SettingsContext';
import { CaptureStormScreen } from './src/screens/CaptureStormScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { StormDetailScreen } from './src/screens/StormDetailScreen';
import { StormDocumentationScreen } from './src/screens/StormDocumentationScreen';
import { WeatherScreen } from './src/screens/WeatherScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

  return (
    <SettingsProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
          <TabNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </SettingsProvider>
  );
}
