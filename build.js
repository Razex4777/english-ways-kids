const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
}

// Files and directories to copy
const itemsToCopy = [
    'index.html',
    'components',
    'css',
    'js',
    'img',
    'lib',
    'server.js'
];

// Copy function
function copyRecursive(src, dest) {
    const stat = fs.statSync(src);
    
    if (stat.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        
        const files = fs.readdirSync(src);
        files.forEach(file => {
            copyRecursive(path.join(src, file), path.join(dest, file));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

// Copy all items
itemsToCopy.forEach(item => {
    if (fs.existsSync(item)) {
        const destPath = path.join('public', item);
        console.log(`Copying ${item} to ${destPath}`);
        copyRecursive(item, destPath);
    }
});

console.log('Build completed successfully!'); 