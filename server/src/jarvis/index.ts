import search from "./search";
import getTrack from "./getTrack";
import logger from "../config/logger";
import getStreamUrl from "./getStreamUrl";
import getMusicDigest from "./getMusicDigest";
import getTrending from "./utils/getTrending";
import getPlaylistTracks from "./getPlaylistTracks";

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
