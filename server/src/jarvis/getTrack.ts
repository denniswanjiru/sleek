import makeComand from "./utils/command";

export default async function (id: string) {
  try {
    const command = makeComand(
      `youtube-dl -f bestaudio https://youtu.be/${id} --skip-download --print-json`
    );

    const {
      thumbnail,
      title: _title,
      upload_date,
      duration,
      url,
      view_count,
    } = JSON.parse((await command.run()) ?? "");

    const [name, title] = _title.split("-");
    const artist = Object.freeze({ name, avatar: "" });

    const song = Object.freeze({
      id,
      title,
      duration,
      thumbnail,
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
