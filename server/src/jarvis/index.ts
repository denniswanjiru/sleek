import getStreamUrl from "./getStreamUrl";
import getTrack from "./getTrack";
import search from "./search";
import getMusicDigest from "./getMusicDigest";
import getPlaylistTracks from "./getPlaylistTracks";
import logger from "../config/logger";
import getTrending from "./utils/getTrending";

function makeJarvis() {
  logger.info("Creating jarvis");

  return Object.freeze({
    search,
    getTrack,
    getTrending,
    getStreamUrl,
    getMusicDigest,
    getPlaylistTracks,
  });
}

export default makeJarvis;
