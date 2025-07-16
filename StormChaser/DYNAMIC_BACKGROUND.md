# Dynamic Background Feature

## Overview

The Storm Chaser app now includes a dynamic background system that changes based on current weather conditions, creating an immersive and visually engaging experience for users.

## Features

### Weather-Based Background Colors
The app automatically adjusts background colors based on:
- **Weather conditions** (rain, snow, clear, cloudy, fog, thunderstorms)
- **Time of day** (day vs night)
- **Temperature** (hot vs cold weather)

### Animated Weather Effects
- **Rain**: Animated raindrops falling from the top of the screen
- **Snow**: Gentle snowflakes with random movement patterns
- **Clouds**: Floating cloud animations for cloudy weather
- **Lightning**: Random lightning flashes for thunderstorms
- **Wind**: Animated wind lines for windy conditions

### Settings Integration
Users can control the dynamic background through the Settings screen:
- Toggle dynamic background on/off
- Choose between metric and imperial units
- Control auto-refresh settings
- Manage notifications

## Technical Implementation

### Components

#### DynamicBackground.tsx
- Main component that manages background colors and basic animations
- Uses LinearGradient for smooth color transitions
- Implements fade-in animations when weather changes

#### WeatherAnimations.tsx
- Handles advanced weather effects (lightning, wind)
- Uses React Native Animated API for smooth animations
- Implements random timing for natural-looking effects

#### SettingsContext.tsx
- Global state management for app settings
- Persists settings using AsyncStorage
- Provides settings to all components

### Weather Conditions Mapping

| Weather Condition | Day Colors | Night Colors | Animation |
|------------------|------------|--------------|-----------|
| Thunderstorm | Dark gray gradient | Very dark blue | Rain + Lightning |
| Rain | Blue to purple | Dark blue | Rain drops |
| Snow | Light gray to blue | Dark gray | Snowflakes |
| Clear | Blue to green | Dark blue | None |
| Cloudy | Gray to blue | Dark gray | Floating clouds |
| Fog | Light gray | Dark gray | Cloudy effect |

### Performance Considerations
- Animations use `useNativeDriver: false` for complex effects
- Background changes are optimized with fade transitions
- Settings are cached locally for fast access
- Weather data is fetched efficiently to minimize API calls

## Usage

### For Users
1. Navigate to the Settings tab
2. Toggle "Dynamic Background" on/off
3. The background will automatically update based on current weather
4. Changes are applied immediately without app restart

### For Developers
```typescript
// Using the dynamic background
<DynamicBackground weather={currentWeather}>
  <YourScreenContent />
</DynamicBackground>

// Accessing settings
const { settings, updateSetting } = useSettings();
```

## Customization

### Adding New Weather Conditions
1. Update the `getWeatherBackground` function in `DynamicBackground.tsx`
2. Add new color schemes and animation types
3. Implement corresponding animation effects

### Modifying Animations
1. Edit animation parameters in the respective components
2. Adjust timing, opacity, and movement patterns
3. Test on different device sizes

### Color Schemes
- Colors are defined in the theme constants
- Support for both light and dark modes
- Easy to customize for different weather conditions

## Future Enhancements

- **Seasonal themes**: Different color schemes for different seasons
- **Custom animations**: User-selectable animation styles
- **Weather intensity**: More dramatic effects for severe weather
- **Sound effects**: Optional audio feedback for weather conditions
- **Performance optimization**: Further optimization for older devices

## Troubleshooting

### Common Issues
1. **Background not changing**: Check if dynamic background is enabled in settings
2. **Animations not working**: Verify weather data is being fetched correctly
3. **Performance issues**: Consider disabling on older devices

### Debug Mode
Enable debug logging by setting `__DEV__` to true in development builds to see weather condition mappings and animation states. 