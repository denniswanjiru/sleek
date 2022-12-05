import makeComand from "./utils/command";

export default async function (trackId: string) {
  try {
    const command = makeComand();
    const cmd = `youtube-dl -f bestaudio https://youtu.be/${trackId} --skip-download -g`;

    return await command.run(cmd);
  } catch (error) {
    throw error;
  }
}
