import getStreamUrl from "./getStreamUrl";
import getTrack from "./getTrack";
import search from "./search";

function makeJarvis() {
  return Object.freeze({
    search,
    getTrack,
    getStreamUrl,
  });
}

export default makeJarvis;
