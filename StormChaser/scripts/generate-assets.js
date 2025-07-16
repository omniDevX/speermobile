const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Function to convert SVG to PNG
async function convertSvgToPng(svgPath, pngPath, width, height) {
  try {
    const svgBuffer = fs.readFileSync(svgPath);
    
    await sharp(svgBuffer)
      .resize(width, height)
      .png()
      .toFile(pngPath);
    
    console.log(`✅ Generated: ${pngPath} (${width}x${height})`);
  } catch (error) {
    console.error(`❌ Error generating ${pngPath}:`, error.message);
  }
}

// Main function to generate all assets
async function generateAssets() {
  console.log('🎨 Generating Storm Chaser app assets...\n');
  
  const assetsDir = path.join(__dirname, '..', 'assets');
  
  // Ensure assets directory exists
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }
  
  // Generate app icon (1024x1024)
  await convertSvgToPng(
    path.join(assetsDir, 'icon.svg'),
    path.join(assetsDir, 'icon.png'),
    1024,
    1024
  );
  
  // Generate adaptive icon (1024x1024)
  await convertSvgToPng(
    path.join(assetsDir, 'adaptive-icon.svg'),
    path.join(assetsDir, 'adaptive-icon.png'),
    1024,
    1024
  );
  
  // Generate splash screen (1242x2436 for iPhone X resolution)
  await convertSvgToPng(
    path.join(assetsDir, 'splash.svg'),
    path.join(assetsDir, 'splash.png'),
    1242,
    2436
  );
  
  // Generate favicon (32x32)
  await convertSvgToPng(
    path.join(assetsDir, 'icon.svg'),
    path.join(assetsDir, 'favicon.png'),
    32,
    32
  );
  
  // Generate splash icon (1024x1024 for splash screen)
  await convertSvgToPng(
    path.join(assetsDir, 'icon.svg'),
    path.join(assetsDir, 'splash-icon.png'),
    1024,
    1024
  );
  
  console.log('\n🎉 All assets generated successfully!');
  console.log('\n📱 Generated files:');
  console.log('  • icon.png (1024x1024) - Main app icon');
  console.log('  • adaptive-icon.png (1024x1024) - Android adaptive icon');
  console.log('  • splash.png (1242x2436) - Splash screen');
  console.log('  • favicon.png (32x32) - Web favicon');
  console.log('  • splash-icon.png (1024x1024) - Splash screen icon');
}

// Run the script
generateAssets().catch(console.error); 