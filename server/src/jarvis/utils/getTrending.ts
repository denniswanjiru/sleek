import makeComand from "./command";

export default async function () {
  try {
    const command = makeComand();
    const cmd = `youtube-dl -f bestaudio https://youtu.be --skip-download -g`;

    // todo: return trending music
    return null;
  } catch (error) {
    throw error;
  }
}
