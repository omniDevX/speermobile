import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { WeatherData } from '../types';

interface WeatherAnimationsProps {
  weather: WeatherData | null;
}

export const WeatherAnimations: React.FC<WeatherAnimationsProps> = ({ weather }) => {
  const lightningAnim = useRef(new Animated.Value(0)).current;
  const thunderAnim = useRef(new Animated.Value(0)).current;
  const windAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!weather) return;

    const description = weather.weatherDescription.toLowerCase();
    
    // Lightning effect for thunderstorms
    if (description.includes('thunderstorm')) {
      const lightningInterval = setInterval(() => {
        // Random lightning timing
        const delay = Math.random() * 5000 + 2000; // 2-7 seconds
        
        setTimeout(() => {
          Animated.sequence([
            Animated.timing(lightningAnim, {
              toValue: 1,
              duration: 100,
              useNativeDriver: false,
            }),
            Animated.timing(lightningAnim, {
              toValue: 0,
              duration: 100,
              useNativeDriver: false,
            }),
            Animated.timing(thunderAnim, {
              toValue: 1,
              duration: 50,
              useNativeDriver: false,
            }),
            Animated.timing(thunderAnim, {
              toValue: 0,
              duration: 50,
              useNativeDriver: false,
            }),
          ]).start();
        }, delay);
      }, 8000); // Check every 8 seconds

      return () => clearInterval(lightningInterval);
    }

    // Wind effect for windy conditions
    if (weather.windSpeed > 20) {
      Animated.loop(
        Animated.timing(windAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        })
      ).start();
    }
  }, [weather]);

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
    },
    lightning: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    thunder: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    windLine: {
      position: 'absolute',
      height: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: 1,
    },
  });

  const renderWindLines = () => {
    if (!weather || weather.windSpeed <= 20) return null;

    const lines = [];
    for (let i = 0; i < 8; i++) {
      const top = Math.random() * 400 + 100;
      const width = Math.random() * 100 + 50;
      const left = Math.random() * 100;
      
      lines.push(
        <Animated.View
          key={`wind-${i}`}
          style={[
            styles.windLine,
            {
              top: top,
              left: `${left}%`,
              width: width,
              transform: [{
                translateX: windAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-width, 400],
                })
              }],
              opacity: windAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 0.6, 0],
              }),
            }
          ]}
        />
      );
    }
    return lines;
  };

  if (!weather) return null;

  return (
    <View style={styles.container}>
      {/* Lightning flash */}
      <Animated.View
        style={[
          styles.lightning,
          {
            opacity: lightningAnim,
          }
        ]}
      />
      
      {/* Thunder effect */}
      <Animated.View
        style={[
          styles.thunder,
          {
            opacity: thunderAnim,
          }
        ]}
      />
      
      {/* Wind lines */}
      {renderWindLines()}
    </View>
  );
}; 