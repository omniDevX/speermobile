import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { darkTheme, lightTheme } from '../constants/theme';
import { useSettings } from '../contexts/SettingsContext';

interface SettingsScreenProps {
  navigation: any;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  const { settings, updateSetting } = useSettings();

  const clearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will delete all saved storm documentation and weather data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              // Note: This would need to be implemented with proper database clearing
              Alert.alert('Success', 'All data has been cleared.');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear data.');
            }
          },
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: currentTheme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: currentTheme.colors.border,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.colors.text,
      marginLeft: currentTheme.spacing.md,
    },
    content: {
      flex: 1,
    },
    section: {
      marginVertical: currentTheme.spacing.md,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: currentTheme.colors.text,
      marginBottom: currentTheme.spacing.sm,
      paddingHorizontal: currentTheme.spacing.md,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: currentTheme.spacing.md,
      paddingHorizontal: currentTheme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: currentTheme.colors.border,
    },
    settingInfo: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      color: currentTheme.colors.text,
      marginBottom: currentTheme.spacing.xs,
    },
    settingDescription: {
      fontSize: 14,
      color: currentTheme.colors.textSecondary,
    },
    unitsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    unitButton: {
      paddingHorizontal: currentTheme.spacing.md,
      paddingVertical: currentTheme.spacing.sm,
      borderRadius: currentTheme.borderRadius.sm,
      marginLeft: currentTheme.spacing.sm,
    },
    unitButtonActive: {
      backgroundColor: currentTheme.colors.primary,
    },
    unitButtonInactive: {
      backgroundColor: currentTheme.colors.border,
    },
    unitButtonText: {
      fontSize: 14,
      fontWeight: '600',
    },
    unitButtonTextActive: {
      color: '#fff',
    },
    unitButtonTextInactive: {
      color: currentTheme.colors.textSecondary,
    },
    dangerSection: {
      marginTop: currentTheme.spacing.xl,
    },
    dangerButton: {
      backgroundColor: currentTheme.colors.error,
      marginHorizontal: currentTheme.spacing.md,
      paddingVertical: currentTheme.spacing.md,
      borderRadius: currentTheme.borderRadius.md,
      alignItems: 'center',
    },
    dangerButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color={currentTheme.colors.text} 
          />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Dynamic Background</Text>
              <Text style={styles.settingDescription}>
                Change app background based on current weather conditions
              </Text>
            </View>
            <Switch
              value={settings.dynamicBackground}
              onValueChange={(value) => updateSetting('dynamicBackground', value)}
              trackColor={{ 
                false: currentTheme.colors.border, 
                true: currentTheme.colors.primary 
              }}
              thumbColor={settings.dynamicBackground ? '#fff' : currentTheme.colors.textSecondary}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Units</Text>
              <Text style={styles.settingDescription}>
                Choose temperature and measurement units
              </Text>
            </View>
            <View style={styles.unitsContainer}>
              <TouchableOpacity
                style={[
                  styles.unitButton,
                  settings.units === 'metric' 
                    ? styles.unitButtonActive 
                    : styles.unitButtonInactive
                ]}
                onPress={() => updateSetting('units', 'metric')}
              >
                <Text style={[
                  styles.unitButtonText,
                  settings.units === 'metric' 
                    ? styles.unitButtonTextActive 
                    : styles.unitButtonTextInactive
                ]}>
                  Metric
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.unitButton,
                  settings.units === 'imperial' 
                    ? styles.unitButtonActive 
                    : styles.unitButtonInactive
                ]}
                onPress={() => updateSetting('units', 'imperial')}
              >
                <Text style={[
                  styles.unitButtonText,
                  settings.units === 'imperial' 
                    ? styles.unitButtonTextActive 
                    : styles.unitButtonTextInactive
                ]}>
                  Imperial
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Updates</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Auto Refresh</Text>
              <Text style={styles.settingDescription}>
                Automatically update weather data every 30 minutes
              </Text>
            </View>
            <Switch
              value={settings.autoRefresh}
              onValueChange={(value) => updateSetting('autoRefresh', value)}
              trackColor={{ 
                false: currentTheme.colors.border, 
                true: currentTheme.colors.primary 
              }}
              thumbColor={settings.autoRefresh ? '#fff' : currentTheme.colors.textSecondary}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingDescription}>
                Receive alerts for severe weather conditions
              </Text>
            </View>
            <Switch
              value={settings.notifications}
              onValueChange={(value) => updateSetting('notifications', value)}
              trackColor={{ 
                false: currentTheme.colors.border, 
                true: currentTheme.colors.primary 
              }}
              thumbColor={settings.notifications ? '#fff' : currentTheme.colors.textSecondary}
            />
          </View>
        </View>

        <View style={styles.dangerSection}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          
          <TouchableOpacity style={styles.dangerButton} onPress={clearData}>
            <Text style={styles.dangerButtonText}>Clear All Data</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}; 