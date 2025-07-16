const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create a simple splash screen
function createSplashScreen() {
  const width = 1242;
  const height = 2436;
  
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#0f172a');
  gradient.addColorStop(0.5, '#1e3a8a');
  gradient.addColorStop(1, '#3b82f6');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add some cloud-like shapes
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  
  // Cloud 1
  ctx.beginPath();
  ctx.ellipse(300, 600, 200, 120, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(500, 600, 150, 90, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(650, 600, 100, 60, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  // Cloud 2
  ctx.beginPath();
  ctx.ellipse(800, 400, 180, 110, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(950, 400, 120, 70, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  // Add lightning bolt
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.moveTo(500, 300);
  ctx.lineTo(450, 500);
  ctx.lineTo(550, 500);
  ctx.lineTo(500, 700);
  ctx.lineTo(600, 700);
  ctx.lineTo(550, 500);
  ctx.lineTo(650, 500);
  ctx.closePath();
  ctx.fill();
  
  // Add app title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Storm Chaser', width / 2, 1200);
  
  // Add subtitle
  ctx.font = '24px Arial';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fillText('Meteorology App', width / 2, 1280);
  
  // Add loading indicator
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(width / 2, 1400, 30, 0, 2 * Math.PI);
  ctx.stroke();
  
  // Save the image
  const buffer = canvas.toBuffer('image/png');
  const outputPath = path.join(__dirname, '..', 'assets', 'splash.png');
  fs.writeFileSync(outputPath, buffer);
  
  console.log('✅ Simple splash screen generated!');
}

createSplashScreen(); 