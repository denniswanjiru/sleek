import makeComand from "./utils/command";

export default async function (id: string) {
  try {
    const command = makeComand(
      `youtube-dl -f bestaudio https://youtu.be/${id} --skip-download -g`
    );

    return await command.run();
  } catch (error) {
    throw error;
  }
}
