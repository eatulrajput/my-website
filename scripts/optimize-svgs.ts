import fs from "fs";
import path from "path";
import { optimize, Config } from "svgo";

const svgoConfig: Config = {
  multipass: true,
  plugins: [
    "preset-default",
    "removeDimensions",
    {
      name: "removeAttrs",
      params: {
        attrs: "(data-name|data-plugin)",
      },
    },
  ],
};

function processDirectory(dirPath: string): void {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".svg")) {
      try {
        const svgData = fs.readFileSync(fullPath, "utf8").replace(/^\uFEFF/, "");

        // Ensure the file is actually an SVG XML document
        const isSvg = /^\s*(?:<\?xml[^>]*\?>\s*)?(?:<!--[\s\S]*?-->\s*)*(?:<!DOCTYPE[^>]*>\s*)?<svg/i.test(svgData);
        if (!isSvg) {
          console.warn(`Skipping ${entry.name}: file is a binary image or invalid SVG XML.`);
          continue;
        }

        const beforeSize = Buffer.byteLength(svgData);

        const result = optimize(svgData, { path: fullPath, ...svgoConfig });
        if (result.data) {
          const afterSize = Buffer.byteLength(result.data);
          fs.writeFileSync(fullPath, result.data);
          console.log(
            `Optimized ${entry.name}: ${(beforeSize / 1024).toFixed(1)}KB -> ${(
              afterSize / 1024
            ).toFixed(1)}KB`
          );
        }
      } catch (err: any) {
        console.error(`Error optimizing ${entry.name}:`, err.message);
      }
    }
  }
}

console.log("Optimizing SVG assets...");
processDirectory(path.resolve("./public"));
console.log("SVG optimization completed.");
