import fs from "fs";
import path from "path";
import sharp from "sharp";

const TARGET_DIRS = [
  path.resolve("./public/images"),
  path.resolve("./public/travel"),
  path.resolve("./public/design"),
];

const MAX_WIDTH = 1920;
const QUALITY = 78;

async function optimizeImageFile(filePath: string): Promise<void> {
  const stat = fs.statSync(filePath);
  // Only process files larger than 300 KB
  if (stat.size < 300 * 1024) return;

  const ext = path.extname(filePath).toLowerCase();
  if (![".webp", ".jpg", ".jpeg", ".png"].includes(ext)) return;

  try {
    const tmpPath = filePath + ".tmp";
    let pipeline = sharp(filePath);
    const metadata = await pipeline.metadata();

    if (metadata.width && metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    if (ext === ".webp") {
      pipeline = pipeline.webp({ quality: QUALITY, effort: 6 });
    } else if (ext === ".jpg" || ext === ".jpeg") {
      pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
    } else if (ext === ".png") {
      pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 8 });
    }

    await pipeline.toFile(tmpPath);
    const newStat = fs.statSync(tmpPath);

    if (newStat.size < stat.size) {
      fs.renameSync(tmpPath, filePath);
      console.log(
        `Compressed ${path.basename(filePath)}: ${(stat.size / 1024 / 1024).toFixed(
          2
        )}MB -> ${(newStat.size / 1024 / 1024).toFixed(2)}MB`
      );
    } else {
      fs.unlinkSync(tmpPath);
    }
  } catch (err: any) {
    console.error(`Error processing ${filePath}:`, err.message);
  }
}

async function convertRasterSvg(
  svgPath: string,
  outWebpPath: string,
  size = 128
): Promise<void> {
  if (!fs.existsSync(svgPath)) return;
  try {
    const beforeSize = fs.statSync(svgPath).size;
    await sharp(svgPath)
      .resize(size, size, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .webp({ quality: 85 })
      .toFile(outWebpPath);
    const afterSize = fs.statSync(outWebpPath).size;
    console.log(
      `Converted ${path.basename(svgPath)} (${(beforeSize / 1024 / 1024).toFixed(
        2
      )}MB SVG) -> ${path.basename(outWebpPath)} (${(afterSize / 1024).toFixed(
        1
      )}KB WebP)`
    );
  } catch (err: any) {
    console.error(`Error converting ${svgPath}:`, err.message);
  }
}

async function processDirectory(dirPath: string): Promise<void> {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      await optimizeImageFile(fullPath);
    }
  }
}

async function run(): Promise<void> {
  console.log("Starting image compression...");
  for (const dir of TARGET_DIRS) {
    await processDirectory(dir);
  }

  console.log("\nConverting heavy institution SVG logos to tiny WebP icons...");
  await convertRasterSvg(
    path.resolve("./public/logos/kiit.svg"),
    path.resolve("./public/logos/kiit.webp"),
    128
  );
  await convertRasterSvg(
    path.resolve("./public/logos/gvp.svg"),
    path.resolve("./public/logos/gvp.webp"),
    128
  );
  await convertRasterSvg(
    path.resolve("./public/design/book_cover.svg"),
    path.resolve("./public/design/book_cover.webp"),
    800
  );

  console.log("\nImage optimization finished.");
}

run();
