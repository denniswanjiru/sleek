import makeComand from "./utils/command";

export default async function (trackId: string) {
  try {
    const command = makeComand();
    const cmd = `youtube-dl -f bestaudio https://youtu.be/${trackId} --skip-download --print-json`;

    const {
      thumbnail,
      title: _title,
      upload_date,
      duration,
      url,
      view_count,
    } = JSON.parse((await command.run(cmd)) ?? "");

    const [name, title] = _title.split("-");
    const artist = Object.freeze({ name, avatar: "" });

    const song = Object.freeze({
      title,
      duration,
      thumbnail,
      id: trackId,
      streamUrl: url,
      views: view_count,
      publishedOn: upload_date,
      artist,
    });

    return song;
  } catch (error) {
    throw error;
  }
}
