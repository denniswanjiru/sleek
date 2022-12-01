import util from "util";
import { exec } from "child_process";

const _exec = util.promisify(exec);

function makeComand(command: string) {
  const run = async () => {
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

export default makeComand;
