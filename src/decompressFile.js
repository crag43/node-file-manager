import path from "path";
import { createBrotliDecompress } from "zlib";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream, existsSync, mkdirSync } from "fs";

export async function decompressFile (
  currentDir,
  pathToFile,
  pathToDestination
) {
  try {
    const filePath = path.resolve(currentDir, pathToFile);
    if (!existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
    }

    const destDir = path.resolve(currentDir, pathToDestination);
    mkdirSync(destDir, { recursive: true });

    const originalFileName = path.basename(
      pathToFile,
      path.extname(pathToFile)
    );
    const destinationPath = path.join(destDir, originalFileName);

    await pipeline(
      createReadStream(filePath),
      createBrotliDecompress(),
      createWriteStream(destinationPath)
    );
  } catch (err) {
    console.error(err.message);
  }
}
