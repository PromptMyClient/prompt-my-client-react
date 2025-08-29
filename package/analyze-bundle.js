#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Analyzing bundle size...\n');

try {
  // Build the package
  console.log('📦 Building package...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Check dist folder sizes
  const distPath = './dist';
  const files = fs.readdirSync(distPath);
  
  console.log('\n📊 Bundle Analysis:');
  console.log('==================');
  
  let totalSize = 0;
  
  files.forEach(file => {
    const filePath = path.join(distPath, file);
    const stats = fs.statSync(filePath);
    const sizeInBytes = stats.size;
    const sizeInKB = (sizeInBytes / 1024).toFixed(2);
    
    console.log(`${file.padEnd(20)} ${sizeInKB.padStart(8)} KB`);
    totalSize += sizeInBytes;
  });
  
  const totalKB = (totalSize / 1024).toFixed(2);
  console.log('==================');
  console.log(`Total:${' '.repeat(13)} ${totalKB.padStart(8)} KB`);
  
  // Recommendations
  console.log('\n💡 Optimization Tips:');
  if (totalSize > 50 * 1024) {
    console.log('⚠️  Bundle is larger than 50KB. Consider:');
    console.log('   - Tree shaking unused code');
    console.log('   - Code splitting by feature');
    console.log('   - Removing unused dependencies');
  } else {
    console.log('✅ Bundle size is good!');
  }
  
} catch (error) {
  console.error('❌ Error analyzing bundle:', error.message);
  process.exit(1);
}
