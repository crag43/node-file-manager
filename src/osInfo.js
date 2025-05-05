import os from "os";

export default async function getOSInfo(flag) {
  switch (flag) {
    case "--EOL":
      console.log(JSON.stringify(os.EOL));
      break;
    case "--cpus":
      const cpus = os.cpus();
      console.log(`Overall CPUs: ${cpus.length}`);
      cpus.forEach((cpu, i) =>
        console.log(`CPU ${i + 1}: ${cpu.model}, ${cpu.speed / 1000} GHz`)
      );
      break;
    case "--homedir":
      console.log(os.homedir());
      break;
    case "--username":
      console.log(os.userInfo().username);
      break;
    case "--architecture":
      console.log(os.arch());
      break;
    default:
      console.log("Invalid input")
      break;
  }
}
