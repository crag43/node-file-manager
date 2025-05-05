import fsSync from "fs";
import fs from "node:fs/promises";
import path from "path";

export function readFile(currentDir, pathToFile) {
  const filePath = path.resolve(currentDir, pathToFile);
  const readStream = fsSync.createReadStream(filePath, { encoding: "utf-8" });

  readStream.on("data", (chunk) => {
    console.log(chunk);
  });
}
export async function createFile(currentDir, pathToFile) {
  const filePath = path.resolve(currentDir, pathToFile);
  try {
    if (!fsSync.existsSync(filePath)) {
      await fs.writeFile(filePath, "");
    } else {
      console.error("File already exists!");
    }
  } catch (err) {
    console.log(err);
  }
}
export async function makeDirectory(currentDir, newDirectoryName) {
  const directoryPath = path.resolve(currentDir, newDirectoryName);
  try {
    if (!fsSync.existsSync(directoryPath)) {
      await fs.mkdir(directoryPath, { recursive: true });
    }
  } catch {
    throw Error("Directory already exists!");
  }
}
export async function renameFile(currentDir, pathToFile, newFileName) {
  const filePath = path.resolve(currentDir, pathToFile);
  const newFilePath = path.resolve(currentDir, newFileName);
  try {
    await fs.rename(filePath, newFilePath);
  } catch (err) {
    throw err;
  }
}
export async function copyFile(currentDir, pathToFile, pathToNewDirectory) {
  const source = path.resolve(currentDir, pathToFile);
  const destDir = path.resolve(currentDir, pathToNewDirectory);
  const dest = path.join(destDir, path.basename(source));

  await fs.mkdir(destDir, { recursive: true });

  return pipeline(
    fsSync.createReadStream(source),
    fsSync.createWriteStream(dest)
  );
}
export async function moveFile(currentDir, pathToFile, pathToNewDirectory) {
  const filePath = path.resolve(currentDir, pathToFile);
  const newDir = path.resolve(currentDir, pathToNewDirectory);
  const newFilePath = path.join(newDir, pathToFile);

  await fs.mkdir(path.dirname(newDir), { recursive: true });
  try {
    await fs.rename(filePath, newFilePath);
  } catch (err) {
    if (err.code === "EXDEV") {
      await fs.copyFile(filePath, newFilePath);
      await fs.unlink(filePath);
    } else {
      throw err;
    }
  }
}
export async function deleteFile(currentDir, pathToFile) {
  const filePath = path.resolve(currentDir, pathToFile);
  try {
    await fs.rm(filePath, { recursive: true });
  } catch (err) {
    console.log(err.message);
  }
}
