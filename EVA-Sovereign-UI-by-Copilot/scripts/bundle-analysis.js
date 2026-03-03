const fs = require('fs');
const path = require('path');

function analyzeBundleSize() {
  console.log('📦 Bundle Size Analysis\n');
  console.log('========================\n');
  
  const distPath = path.join(__dirname, '..', 'dist');
  
  if (!fs.existsSync(distPath)) {
    console.log('❌ No dist/ directory found. Run "npm run build" first.\n');
    return;
  }
  
  const results = {
    timestamp: new Date().toISOString(),
    files: [],
    total: 0,
  };
  
  function getFileSize(filePath) {
    const stats = fs.statSync(filePath);
    return stats.size;
  }
  
  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }
  
  function analyzeDirectory(dir, prefix = '') {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        analyzeDirectory(filePath, prefix + file + '/');
      } else if (stat.isFile()) {
        const size = getFileSize(filePath);
        results.files.push({
          path: prefix + file,
          size: size,
          sizeFormatted: formatBytes(size),
        });
        results.total += size;
      }
    });
  }
  
  analyzeDirectory(distPath);
  
  // Sort by size (descending)
  results.files.sort((a, b) => b.size - a.size);
  
  // Print results
  console.log('File Sizes:\n');
  results.files.slice(0, 20).forEach((file, index) => {
    console.log(`${index + 1}. ${file.path}`);
    console.log(`   Size: ${file.sizeFormatted}\n`);
  });
  
  if (results.files.length > 20) {
    console.log(`... and ${results.files.length - 20} more files\n`);
  }
  
  console.log('========================');
  console.log(`Total Bundle Size: ${formatBytes(results.total)}\n`);
  
  // Compare to typical React bundle
  const typicalReactBundle = 200 * 1024; // ~200KB for minimal React app
  const savings = typicalReactBundle - results.total;
  const savingsPercent = (savings / typicalReactBundle) * 100;
  
  console.log('📊 Comparison to React:\n');
  console.log(`Typical React bundle: ${formatBytes(typicalReactBundle)}`);
  console.log(`Web Components bundle: ${formatBytes(results.total)}`);
  
  if (savings > 0) {
    console.log(`Savings: ${formatBytes(savings)} (${savingsPercent.toFixed(1)}% smaller) ✅\n`);
  } else {
    console.log(`Difference: ${formatBytes(-savings)} (${(-savingsPercent).toFixed(1)}% larger) ⚠️\n`);
  }
  
  // Save results
  fs.writeFileSync(
    'bundle-size-analysis.json',
    JSON.stringify(results, null, 2)
  );
  
  console.log('📄 Full analysis saved to bundle-size-analysis.json\n');
}

analyzeBundleSize();
