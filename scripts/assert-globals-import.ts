import * as fs from "fs";
import * as path from "path";

const layoutPath = path.resolve(__dirname, "../src/app/layout.tsx");

if (!fs.existsSync(layoutPath)) {
  console.error("FAIL: src/app/layout.tsx does not exist");
  process.exit(1);
}

const content = fs.readFileSync(layoutPath, "utf-8");

if (!content.includes("@/styles/globals.css")) {
  console.error(
    'FAIL: src/app/layout.tsx must import "@/styles/globals.css"'
  );
  process.exit(1);
}

console.log("PASS: globals.css import found in layout.tsx");
