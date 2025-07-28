#!/usr/bin/env node

/**
 * Build Script - Combines all HTML components into a single index.html file
 * 
 * Usage: node build-single-file.js
 * 
 * This script reads all component files and combines them into a single
 * HTML file for production use or when you need everything in one file.
 */

const fs = require('fs');
const path = require('path');

// Component files in order
const components = [
    'head.html',
    'spinner.html', 
    'navbar.html',
    'hero.html',
    'contact-modal.html',
    'about.html',
    'video-modal.html',
    'services.html',
    'programs.html',
    'events.html',
    'faq.html',
    'team.html',
    'testimonials.html',
    'footer.html',
    'scripts.html'
];

function buildSingleFile() {
    console.log('🏗️  Building single HTML file from components...\n');
    
    let combinedHTML = '';
    let errors = [];

    // Read each component file
    components.forEach((componentFile, index) => {
        const componentPath = path.join(__dirname, 'components', componentFile);
        
        try {
            if (fs.existsSync(componentPath)) {
                const content = fs.readFileSync(componentPath, 'utf8');
                
                // For head.html, we only want the content inside <head> and opening <body>
                if (componentFile === 'head.html') {
                    combinedHTML += content;
                } else if (componentFile === 'scripts.html') {
                    // For scripts.html, it already includes </body></html>
                    combinedHTML += '\n' + content;
                } else {
                    // For other components, add their content with proper spacing
                    combinedHTML += '\n' + content + '\n';
                }
                
                console.log(`✅ Added: ${componentFile}`);
            } else {
                errors.push(`❌ File not found: ${componentFile}`);
            }
        } catch (error) {
            errors.push(`❌ Error reading ${componentFile}: ${error.message}`);
        }
    });

    // Report any errors
    if (errors.length > 0) {
        console.log('\n⚠️  Errors encountered:');
        errors.forEach(error => console.log(error));
        console.log('');
    }

    // Write the combined file
    try {
        const outputPath = path.join(__dirname, 'index-built.html');
        fs.writeFileSync(outputPath, combinedHTML, 'utf8');
        
        console.log(`\n🎉 Successfully built: index-built.html`);
        console.log(`📊 Total file size: ${(combinedHTML.length / 1024).toFixed(1)} KB`);
        console.log(`📝 Lines of code: ${combinedHTML.split('\n').length}`);
        
        // Create backup of original if it exists
        const originalPath = path.join(__dirname, 'index.html');
        if (fs.existsSync(originalPath)) {
            const backupPath = path.join(__dirname, 'index-original-backup.html');
            fs.copyFileSync(originalPath, backupPath);
            console.log(`💾 Original index.html backed up to: index-original-backup.html`);
        }
        
        console.log('\n✨ Build complete! You can now:');
        console.log('   • Use index-built.html as your production file');
        console.log('   • Rename it to index.html if needed');
        console.log('   • Deploy the single file to any web server');
        
    } catch (error) {
        console.error(`❌ Error writing output file: ${error.message}`);
        process.exit(1);
    }
}

// Run the build
try {
    buildSingleFile();
} catch (error) {
    console.error(`💥 Build failed: ${error.message}`);
    process.exit(1);
} 