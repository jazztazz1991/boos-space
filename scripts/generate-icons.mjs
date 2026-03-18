import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const input = path.join(root, "image.png");
const outDir = path.join(root, "public", "icons");

const sizes = [
  { name: "icon-180.png", size: 180 },
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
];

for (const { name, size } of sizes) {
  await sharp(input)
    .resize(size, size, { fit: "cover", position: "top" })
    .png()
    .toFile(path.join(outDir, name));
  console.log(`Created ${name} (${size}x${size})`);
}

console.log("Done!");
