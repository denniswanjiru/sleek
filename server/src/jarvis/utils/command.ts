import util from "util";
import { exec } from "child_process";

const _exec = util.promisify(exec);

export default function makeComand() {
  const run = async (command: string) => {
    try {
      const { stdout, stderr } = await _exec(command);

      if (stderr) return null;
      return stdout;
    } catch (error) {
      throw error;
    }
  };

  return Object.freeze({
    run,
  });
}
