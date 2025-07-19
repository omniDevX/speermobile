#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Storm Chaser Production Build Test Script');
console.log('============================================\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: package.json not found. Please run this script from the project root.');
  process.exit(1);
}

// Check if EAS CLI is installed
try {
  execSync('eas --version', { stdio: 'pipe' });
} catch (error) {
  console.error('❌ Error: EAS CLI not found. Please install it with: npm install -g @expo/eas-cli');
  process.exit(1);
}

// Check if logged in to Expo
try {
  execSync('eas whoami', { stdio: 'pipe' });
} catch (error) {
  console.error('❌ Error: Not logged in to Expo. Please run: eas login');
  process.exit(1);
}

console.log('✅ Environment check passed\n');

// Function to run commands with error handling
function runCommand(command, description) {
  console.log(`🔄 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed successfully\n`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    return false;
  }
}

// Main testing sequence
async function runTests() {
  console.log('📋 Running production build tests...\n');

  // 1. Check for TypeScript errors
  if (!runCommand('npx tsc --noEmit', 'TypeScript type checking')) {
    console.log('⚠️  TypeScript errors found. Please fix them before building.');
    return;
  }

  // 2. Run tests
  if (!runCommand('npm test', 'Running tests')) {
    console.log('⚠️  Tests failed. Please fix them before building.');
    return;
  }

  // 3. Build preview version
  console.log('🏗️  Building preview version for testing...');
  if (!runCommand('eas build --platform android --profile preview', 'Building preview version')) {
    console.log('❌ Preview build failed. Please check the errors above.');
    return;
  }

  console.log('\n🎉 Preview build completed successfully!');
  console.log('\n📱 Next steps:');
  console.log('1. Download and install the preview APK');
  console.log('2. Test the app thoroughly:');
  console.log('   - App startup');
  console.log('   - Location permissions');
  console.log('   - Weather data loading');
  console.log('   - Storm documentation features');
  console.log('   - Camera functionality');
  console.log('3. If everything works, build production version:');
  console.log('   eas build --platform android --profile production');
  console.log('\n🔍 Testing checklist:');
  console.log('□ App starts without crashing');
  console.log('□ Location permission request works');
  console.log('□ Weather data loads (with fallback)');
  console.log('□ Database operations work');
  console.log('□ Camera functionality works');
  console.log('□ Error boundaries catch errors gracefully');
  console.log('□ App works offline');
  console.log('□ No console errors in development');
}

// Run the tests
runTests().catch(error => {
  console.error('❌ Test script failed:', error);
  process.exit(1);
}); 