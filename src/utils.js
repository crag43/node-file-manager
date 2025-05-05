export function showGreetings(username) {
  console.log(`Welcome to the File Manager, ${username}`);
}

export function showCurrentDir(currentDir) {
  console.log(`You are currently in ${currentDir}`);
}

export function exit(username) {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  
  process.exit(0);
}
