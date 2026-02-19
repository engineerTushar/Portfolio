import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const srcDir = 'C:/Users/DELL/.gemini/antigravity/brain/3a653dff-8adc-4e41-a89c-96a422211acb';
const destDir = 'd:/Projects/Portfolio/src/assets';

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const files = [
    'uploaded_media_0_1770216579824.png',
    'uploaded_media_1_1770216579824.png',
    'uploaded_media_2_1770216579824.png',
    'uploaded_media_0_1770213750601.png'
];

console.log("Starting copy...");

files.forEach(file => {
    try {
        const src = path.join(srcDir, file);
        const dest = path.join(destDir, file);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest);
            console.log(`Successfully copied ${file} to ${dest}`);
        } else {
            console.log(`Source file not found: ${src}`);
        }
    } catch (err) {
        console.error(`Error copying ${file}:`, err);
    }
});
