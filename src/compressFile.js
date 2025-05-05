import path from "path";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream, existsSync, mkdirSync } from "fs";

export async function compressFile(currentDir, pathToFile, pathToDestination) {
  try {
    const filePath = path.resolve(currentDir, pathToFile);
    if (!existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
    }
    const destDir = path.resolve(currentDir, pathToDestination);
    mkdirSync(destDir, { recursive: true });

    const archivePath = path.join(destDir, `${path.basename(pathToFile)}.br`);
    await pipeline(
      createReadStream(filePath),
      createBrotliCompress(),
      createWriteStream(archivePath)
    );
  } catch (err) {
    console.log(err.message);
  }
}
