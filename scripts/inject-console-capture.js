const fs = require('fs');
const path = require('path');

// Script to inject console capture into HTML files after build
function injectConsoleCapture() {
  const buildDir = path.join(process.cwd(), '.next');
  
  if (!fs.existsSync(buildDir)) {
    console.log('No build directory found. Run build first.');
    return;
  }
  
  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
  
  // Find and inject into HTML files
  function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processDirectory(filePath);
      } else if (file.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        if (!content.includes('dashboard-console-capture.js')) {
          content = content.replace('<head>', `<head>\n  ${scriptTag}`);
          fs.writeFileSync(filePath, content);
          console.log(`Injected console capture into ${filePath}`);
        }
      }
    });
  }
  
  try {
    processDirectory(buildDir);
    console.log('Console capture injection completed.');
  } catch (error) {
    console.error('Error during injection:', error);
  }
}

injectConsoleCapture();