<img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/724dca95-ed2c-4356-95a6-4d8bf13a1933" />
# Storm Chaser - Mobile Meteorology App

A comprehensive mobile application for storm chasing hobbyist meteorologists, built with React Native and Expo. This app allows users to track weather conditions, capture storm documentation with photos, and maintain a local database of meteorological events.

## 🌟 Features

### Core Features
- **Weather Data View**: Real-time weather information based on device location
- **Storm Documentation**: Capture photos and metadata for weather events
- **Local Data Persistence**: SQLite database for storing storm documentation
- **Camera Integration**: Photo capture and gallery selection
- **Geolocation Services**: GPS-based location tracking
- **Intuitive Navigation**: Bottom tab navigation with stack navigation for detailed views

### Bonus Features
- **Weather Forecast Integration**: 7-day weather forecast
- **Dark Mode Support**: Automatic theme switching based on system preferences
- **Pull-to-Refresh**: Refresh weather data and storm documentation
- **Skeleton Screens**: Loading states for better UX
- **Offline Functionality**: Works with cached data when offline
- **Cloud Integration Ready**: Architecture prepared for cloud storage integration

## 🛠 Technology Stack

- **Framework**: React Native with Expo SDK 53
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **Database**: Expo SQLite
- **Weather API**: Open-Meteo (free weather API)
- **Camera**: Expo Image Picker
- **Location**: Expo Location
- **UI Components**: Custom components with theme support
- **Testing**: Jest for unit testing

## 📱 Screenshots Video Recording

The app features a modern, intuitive interface with:
- Weather dashboard with current conditions and forecast
- Storm documentation list with photo previews
- Photo capture interface with metadata input
- Detailed storm view with comprehensive information
- Dark/light mode support

[Google Drive Video Record](https://drive.google.com/file/d/1I-LKnIgKo83bZ_ZbV7LHgdfBPvmbgIMS/view?usp=drivesdk)

## 🏗 Architecture

### Project Structure
```
src/
├── components/          # Reusable UI components
├── screens/            # Main app screens
├── services/           # Business logic and API calls
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Helper functions
└── constants/          # App constants and themes
```

### Design Patterns
- **Service Layer Pattern**: Separated business logic into service classes
- **Custom Hooks**: Reusable state management with `useWeather` and `useStormDocumentation`
- **Component Composition**: Modular, reusable components
- **Type Safety**: Comprehensive TypeScript implementation
- **Theme System**: Centralized theming with light/dark mode support

### Data Flow
1. **Weather Data**: Location → Weather Service → Open-Meteo API → UI
2. **Storm Documentation**: Camera → Location → Weather → Database → UI
3. **State Management**: Custom hooks with React Context patterns

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (macOS) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd StormChaser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

### Environment Setup

The app uses the following permissions:
- **Camera**: For capturing storm photos
- **Location**: For weather data and storm location tracking
- **Media Library**: For saving and accessing photos

## 📊 API Integration

### Weather API (Open-Meteo)
- **Endpoint**: `https://api.open-meteo.com/v1/forecast`
- **Features**: Current weather, 7-day forecast, geocoding
- **Fallback**: Mock data when API is unavailable
- **Rate Limiting**: Free tier with generous limits

### Weather Data Fields
- Temperature (current and feels like)
- Humidity and pressure
- Wind speed and direction
- Visibility and precipitation
- Weather conditions with icons

## 💾 Data Persistence

### SQLite Database Schema
```sql
CREATE TABLE storm_documentation (
  id TEXT PRIMARY KEY,
  photo_uri TEXT NOT NULL,
  temperature REAL NOT NULL,
  feels_like REAL NOT NULL,
  humidity REAL NOT NULL,
  wind_speed REAL NOT NULL,
  wind_direction REAL NOT NULL,
  pressure REAL NOT NULL,
  visibility REAL NOT NULL,
  precipitation REAL NOT NULL,
  weather_description TEXT NOT NULL,
  weather_icon TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  accuracy REAL,
  date_time TEXT NOT NULL,
  notes TEXT NOT NULL,
  storm_type TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Storm Types
- Thunderstorm ⚡
- Tornado 🌪️
- Hurricane 🌀
- Blizzard ❄️
- Dust Storm 🌪️
- Hail Storm 🧊
- Other 🌩️

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Consistent theming with light/dark mode
- **Typography**: System fonts with proper hierarchy
- **Spacing**: Consistent spacing system (xs, sm, md, lg, xl)
- **Components**: Reusable cards, buttons, and form elements

### User Experience
- **Loading States**: Skeleton screens and activity indicators
- **Error Handling**: Graceful error messages and retry options
- **Pull-to-Refresh**: Intuitive data refresh
- **Empty States**: Helpful messages when no data is available
- **Accessibility**: Proper contrast ratios and touch targets

## 🧪 Testing

### Unit Tests
The app includes comprehensive unit tests for utility functions:

```bash
npm test
```

### Test Coverage
- Helper functions (formatting, validation)
- Utility functions (ID generation, text manipulation)
- Service layer functions
- Component rendering

## 🔧 Configuration

### App Configuration (`app.json`)
- **Permissions**: Camera, location, media library
- **Platform Settings**: iOS and Android specific configurations
- **Splash Screen**: Custom splash screen with app branding
- **Icons**: App icons for all platforms

### Theme Configuration
- **Light Theme**: Clean, modern design with light backgrounds
- **Dark Theme**: Dark backgrounds with proper contrast
- **Automatic Switching**: Follows system preferences

## 📈 Performance Optimizations

- **Image Optimization**: Compressed photos with quality settings
- **Database Indexing**: Optimized queries for fast data retrieval
- **Lazy Loading**: Components loaded on demand
- **Memory Management**: Proper cleanup of resources
- **Caching**: Weather data caching for offline use

## 🔒 Security Considerations

- **Permission Handling**: Proper request and validation of device permissions
- **Data Validation**: Input validation for all user data
- **Error Boundaries**: Graceful error handling without data exposure
- **Local Storage**: Sensitive data stored locally only

## 🚀 Deployment

### Building for Production

1. **Configure app.json** with production settings
2. **Build the app**:
   ```bash
   # iOS
   expo build:ios
   
   # Android
   expo build:android
   ```

3. **Submit to stores**:
   - App Store Connect (iOS)
   - Google Play Console (Android)

### Environment Variables
- Weather API endpoints
- Database configuration
- Feature flags

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Open-Meteo**: Free weather API service
- **Expo Team**: Excellent development platform
- **React Navigation**: Robust navigation solution
- **React Native Community**: Open source contributions

## 📞 Support

For support and questions please email to omniDevX@gmail.com, or raise issues in github:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**Built with ❤️ for the meteorology community** 
