import puppeteer from "puppeteer";
import logger from "../config/logger";
import { Digest, Playlist } from "../types";
import getPropertyValue from "./utils/getPropertyValue";

export default async function () {
  try {
    logger.info("Getting the music digest");

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      "https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ/playlists?view=50&sort=dd"
    );
    const digestsRows = await page.$$(
      "#contents.ytd-section-list-renderer > .ytd-section-list-renderer"
    );

    const digestsPromises = digestsRows.map(async (row) => {
      const digest: Digest = {
        title: "",
        playlistsCount: 0,
        playlists: [],
      };

      const titleEl = await row.$(
        "#title-container > h2 > #image-container > a"
      );

      digest.title = titleEl
        ? (await getPropertyValue(titleEl, "title")) ?? ""
        : "";

      const playlistsCols = await row.$$(
        "#items > .yt-horizontal-list-renderer"
      );

      const playlistsPromises = playlistsCols.map(async (col) => {
        const playlist: Playlist = {
          id: "",
          title: "",
          tracks: "",
          thumbnail: "",
          description: "",
        };

        const playlistTitleEl = await col.$("h3");
        const playlistTitle: string = playlistTitleEl
          ? (await getPropertyValue(playlistTitleEl, "textContent")) ?? ""
          : "";

        const playlistDescriptionEl = await col.$("#description");
        const description: string = playlistDescriptionEl
          ? (await getPropertyValue(playlistDescriptionEl, "textContent")) ?? ""
          : "";

        const tracksCountEl = await col.$("#video-count-text");
        const tracksCount: string = tracksCountEl
          ? (await getPropertyValue(tracksCountEl, "textContent")) ?? ""
          : "";

        const thumbnailEl = await col.$("img");
        const thumbnail: string = thumbnailEl
          ? await getPropertyValue(thumbnailEl, "src")
          : "";

        const playlistUrlEl = await col.$("#thumbnail");
        const url: string = playlistUrlEl
          ? (await getPropertyValue(playlistUrlEl, "href")) ?? ""
          : "";

        const id = url.split("?v=")[1].split("&start")[0];

        playlist.thumbnail = thumbnail;
        playlist.id = encodeURIComponent(id);
        playlist.tracks = tracksCount.split("\n")[1].split("\n")[0].trim();
        playlist.title = playlistTitle.split("\n")[1].split("\n")[0].trim();
        playlist.description = description.split("\n")[1].split("\n")[0].trim();

        return playlist;
      });

      const playlists = await Promise.all(playlistsPromises);
      digest.playlists = playlists;
      digest.playlistsCount = playlists.length;

      return digest;
    });

    return await Promise.all(digestsPromises);
  } catch (error) {
    throw error;
  }
}
