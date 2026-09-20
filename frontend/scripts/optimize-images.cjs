/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const assetRoots = [
  "public/assets/images/home",
  "public/assets/images/services",
  "public/assets/images/projects",
];
const widths = [480, 768, 1280, 1920];

async function main() {
  const inputs = assetRoots.flatMap((root) =>
    fs.readdirSync(root).map((file) => path.join(root, file)),
  ).filter((file) => /\.(jpe?g|png)$/i.test(file));

  for (const input of inputs) {
    const metadata = await sharp(input).metadata();
    const sourceWidth = metadata.width ?? 480;
    const outputWidths = widths.filter((width) => width <= sourceWidth);
    if (outputWidths.length === 0) outputWidths.push(sourceWidth);

    const base = path.join(path.dirname(input), path.basename(input, path.extname(input)));
    for (const width of outputWidths) {
      const pipeline = sharp(input).resize({ width, withoutEnlargement: true });
      await pipeline.clone().webp({ quality: 80, effort: 5 }).toFile(`${base}-${width}.webp`);
      await pipeline.avif({ quality: 52, effort: 5 }).toFile(`${base}-${width}.avif`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
