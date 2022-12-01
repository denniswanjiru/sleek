import puppeteer from "puppeteer";
import { Track } from "../types";
import getPropertyValue from "./utils/getPropertyValue";

export type NonStreamableTrack = Omit<
  Track,
  "streamUrl" | "publishedOn" | "views"
>;

export default async function (query: string): Promise<NonStreamableTrack[]> {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.youtube.com/results?search_query=${query}`);
    const tracksRows = await page.$$(".ytd-item-section-renderer");

    const trackPromises = tracksRows.map(async (row) => {
      let track = {
        id: "",
        title: "",
        listens: "",
        thumbnail: "",
        duration: "",
        artist: {
          name: "",
          avatar: "",
        },
      };

      const thumbnailWrapper = await row.$("#thumbnail");
      if (thumbnailWrapper) {
        const url = (await getPropertyValue(thumbnailWrapper, "href")) ?? "";
        const thumbnail = await thumbnailWrapper.$("img");
        track.thumbnail = thumbnail
          ? await getPropertyValue(thumbnail, "src")
          : "";
        track.id = url.includes("/watch?") ? url.split("?v=")[1] : "";
      }

      // todo: get duration of the track
      // const overlays = await row.$("#overlays");

      const textWrapper = await row.$(".text-wrapper");
      if (textWrapper) {
        const titleLink = await textWrapper.$("#video-title");
        const artistTitle = titleLink
          ? await getPropertyValue(titleLink, "title")
          : null;

        const [name, title] = artistTitle ? artistTitle.split("-") : ["", ""];
        track.artist.name = name ? name.trim() : "";
        track.title = title ? title.trim() : "";
      }

      const metadata = await row.$("#metadata-line");
      if (metadata) {
        const listensPremier = await metadata.$$("span");
        const listensText = listensPremier.length
          ? await getPropertyValue(listensPremier[0], "textContent")
          : null;

        track.listens = listensText ? listensText.split(" ")[0] : "";
      }

      const artistAvatar = await row.$("#channel-thumbnail");
      if (artistAvatar) {
        const avatarEl = await artistAvatar.$("img");
        track.artist.avatar = avatarEl
          ? await getPropertyValue(avatarEl, "src")
          : "";
      }

      return track;
    });

    const tracks = await Promise.all(trackPromises);
    return tracks.filter((track) => track.id);
  } catch (error) {
    throw error;
  }
}
