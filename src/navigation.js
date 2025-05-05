import path from "path";
import fs from "fs";
import os from "os";
import { readdir } from "fs/promises";

export function goUp(currentDir) {
  const homedir = os.homedir();
  const isHomedir = currentDir === homedir;

  currentDir = isHomedir ? homedir : path.join(currentDir, "..");
  return currentDir;
}

export function changeDirectory(currentDir, targetPath) {
  const newPath = path.isAbsolute(targetPath)
    ? targetPath
    : path.resolve(currentDir, targetPath);
  try {
    const isDirectory = fs.statSync(newPath).isDirectory();
    if (isDirectory) return newPath;
    throw new Error("Not a directory");
  } catch {
    throw new Error("Invalid path");
  }
}

export async function listDirectory(currentDir) {
  const items = await readdir(currentDir, { withFileTypes: true });

  const sortedItems = items.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;
    return a.name.localeCompare(b.name);
  });
  const formattedItems = sortedItems.map((item) => {
    return {
      Name: item.name,
      Type: item.isDirectory() ? "directory" : "file",
    };
  });

  console.table(formattedItems);
}
