import { exec } from "child_process";

export const execCommand = async (command: string, directory: string) => {
  console.log(`Command executed: ${command}`);
  try {
    const { stdout, stderr } = exec(command, { cwd: directory });
    // return { stdout, stderr };

    return JSON.stringify({ stdout, stderr }); // Workaround for https://github.com/vercel/next.js/issues/47447
  } catch (error) {
    console.log(`Failed to execute command: ${command}`);
    console.log(error);
  }
};
