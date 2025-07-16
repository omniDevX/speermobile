# Storm Chaser App Assets

This document describes the custom assets created for the Storm Chaser mobile application.

## 🎨 Asset Overview

The Storm Chaser app features custom-designed icons and splash screens that reflect the app's meteorology theme with storm and weather elements.

## 📱 Icons

### Main App Icon (`icon.png`)
- **Size**: 1024x1024 pixels
- **Format**: PNG
- **Design**: Circular icon with storm theme
- **Elements**:
  - Blue gradient background (dark blue to light blue)
  - White clouds with transparency
  - Golden lightning bolt as the main focal point
  - Blue rain drops
  - White wind lines for atmospheric effect

### Adaptive Icon (`adaptive-icon.png`)
- **Size**: 1024x1024 pixels
- **Format**: PNG
- **Purpose**: Android adaptive icon support
- **Design**: Similar to main icon but optimized for Android's adaptive icon system
- **Safe Area**: Content is contained within a 460px radius circle

### Favicon (`favicon.png`)
- **Size**: 32x32 pixels
- **Format**: PNG
- **Purpose**: Web browser favicon
- **Design**: Simplified version of the main icon

## 🌅 Splash Screens

### Main Splash Screen (`splash.png`)
- **Size**: 1242x2436 pixels (iPhone X resolution)
- **Format**: PNG
- **Design**: Full-screen splash with app branding
- **Elements**:
  - Gradient background (dark blue to light blue)
  - Multiple cloud layers with varying opacity
  - Lightning bolts for dramatic effect
  - Rain drops for weather atmosphere
  - Wind lines for movement
  - App title "Storm Chaser" in white
  - Subtitle "Meteorology App"
  - Loading indicator circle

### Splash Icon (`splash-icon.png`)
- **Size**: 1024x1024 pixels
- **Format**: PNG
- **Purpose**: Icon displayed on splash screen
- **Design**: Same as main app icon

## 🎨 Design Elements

### Color Palette
- **Primary Blue**: `#1e3a8a` to `#3b82f6` (gradient)
- **Dark Blue**: `#0f172a` (splash background)
- **Lightning Yellow**: `#fbbf24` to `#f59e0b` (gradient)
- **Rain Blue**: `#60a5fa`
- **Cloud White**: `#ffffff` with transparency
- **Text White**: `#ffffff`

### Weather Elements
1. **Clouds**: Multiple elliptical shapes with varying opacity
2. **Lightning**: Angular zigzag shapes in golden color
3. **Rain**: Small elliptical drops in blue
4. **Wind**: Curved lines suggesting air movement

### Typography
- **App Title**: Bold 72px Arial
- **Subtitle**: 24px Arial with reduced opacity
- **Color**: White with gradient effect

## 🔧 Asset Generation

### Available Scripts
```bash
# Generate all assets from SVG sources
npm run generate-assets

# Generate splash screen only
npm run generate-splash
```

### Source Files
- `assets/icon.svg` - Main icon source
- `assets/adaptive-icon.svg` - Adaptive icon source
- `assets/splash.svg` - Splash screen source (SVG version)
- `scripts/generate-assets.js` - Asset generation script
- `scripts/create-simple-splash.js` - Canvas-based splash generation

### Dependencies
- `sharp` - Image processing library
- `canvas` - Canvas API for Node.js

## 📐 Technical Specifications

### Icon Requirements
- **iOS**: 1024x1024 PNG (App Store)
- **Android**: 1024x1024 PNG (Play Store)
- **Web**: 32x32 PNG (favicon)

### Splash Screen Requirements
- **iOS**: 1242x2436 PNG (iPhone X resolution)
- **Android**: Various sizes supported by Expo
- **Web**: Responsive design

### File Sizes
- `icon.png`: ~71KB
- `adaptive-icon.png`: ~17KB
- `splash.png`: ~219KB
- `favicon.png`: ~1.3KB
- `splash-icon.png`: ~71KB

## 🎯 Design Principles

### Brand Identity
- **Theme**: Meteorology and storm chasing
- **Mood**: Professional yet adventurous
- **Colors**: Blue tones representing sky and weather
- **Elements**: Weather phenomena (lightning, clouds, rain)

### Accessibility
- **Contrast**: High contrast between elements
- **Scalability**: Icons work at various sizes
- **Recognition**: Clear weather theme identification

### Platform Consistency
- **iOS**: Follows iOS design guidelines
- **Android**: Supports adaptive icons
- **Web**: Responsive favicon design

## 🔄 Asset Updates

### When to Update
- App rebranding
- Design system changes
- Platform requirement updates
- Performance optimizations

### Update Process
1. Modify SVG source files
2. Run generation scripts
3. Test on all platforms
4. Update app.json if needed
5. Commit changes to version control

## 📋 Asset Checklist

- [x] Main app icon (1024x1024)
- [x] Adaptive icon (1024x1024)
- [x] Favicon (32x32)
- [x] Splash screen (1242x2436)
- [x] Splash icon (1024x1024)
- [x] SVG source files
- [x] Generation scripts
- [x] Documentation

## 🚀 Deployment

Assets are automatically included in the app bundle and will be used when:
- Building for iOS/Android
- Publishing to app stores
- Running in development
- Deploying to web

The assets are referenced in `app.json` and will be automatically processed by Expo during the build process. 