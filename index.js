import readline from "readline";
import os from "os";
import getOSInfo from "./src/osInfo.js";
import { changeDirectory, goUp, listDirectory } from "./src/navigation.js";
import { exit, showCurrentDir, showGreetings } from "./src/utils.js";
import {
  copyFile,
  createFile,
  deleteFile,
  makeDirectory,
  moveFile,
  readFile,
  renameFile,
} from "./src/files.js";
import path from "path";
import { calculateHash } from "./src/hash.js";
import { decompressFile } from "./src/decompressFile.js";
import { compressFile } from "./src/compressFile.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.setPrompt("> ");
const args = process.argv.slice(2);

let currentDir = path.resolve(os.homedir(), ".vscode");

const usernameArg = args.find((arg) => arg.startsWith("username="));
const username = usernameArg ? usernameArg.split("=")[1] : "Username";

showGreetings(username);
showCurrentDir(currentDir);
rl.prompt();

rl.on("line", async (line) => {
  const input = line.trim();
  const [command, ...args] = input.split(" ");
  try {
    switch (command) {
      case "up":
        currentDir = goUp(currentDir);
        break;
      case "cd":
        currentDir = changeDirectory(currentDir, args[0]);
        break;
      case "ls":
        await listDirectory(currentDir);
        break;
      case "cat":
        readFile(currentDir, args[0]);
        break;
      case "add":
        await createFile(currentDir, args[0]);
        break;
      case "mkdir":
        await makeDirectory(currentDir, args[0]);
        break;
      case "rn":
        await renameFile(currentDir, args[0], args[1]);
        break;
      case "cp":
        await copyFile(currentDir, args[0], args[1]);
        break;
      case "mv":
        await moveFile(currentDir, args[0], args[1]);
        break;
      case "rm":
        await deleteFile(currentDir, args[0]);
        break;
      case "os":
        await getOSInfo(args[0]);
        break;
      case "hash":
        await calculateHash(currentDir, args[0]);
        break;
      case "compress":
        await compressFile(currentDir, args[0], args[1]);
        break;
      case "decompress":
        await decompressFile(currentDir, args[0], args[1]);
        break;
      case ".exit":
        exit(username);
        return;
      default:
        console.log("Invalid input");
        break;
    }
  } catch (err) {
    console.error("Operation failed:", err.message || err);
  }
  showCurrentDir(currentDir);
  rl.prompt();
});

rl.on("SIGINT", () => {
  exit(username);
});