const fs = require('fs');
const path = require('path');

const src = "Prometheus NX 59650";
const dest = "public/models/spaceship";

console.log(`Current Dir: ${process.cwd()}`);
console.log(`Source: ${path.resolve(src)}`);
console.log(`Dest: ${path.resolve(dest)}`);

function copyRecursiveSync(src, dest) {
    if (fs.existsSync(src)) {
        if (fs.lstatSync(src).isDirectory()) {
            if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
            fs.readdirSync(src).forEach(childItemName => {
                copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
            });
        } else {
            const destDir = path.dirname(dest);
            if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
            fs.copyFileSync(src, dest);
            console.log('Copied ' + src);
        }
    } else {
        console.log("SOURCE NOT FOUND: " + src);
    }
}

try {
    copyRecursiveSync(src, dest);
    console.log("Copy complete.");
} catch (e) {
    console.error("Error:", e);
}
