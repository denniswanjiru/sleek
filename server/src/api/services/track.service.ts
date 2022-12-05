import { DataSourceInterface } from "../../intefaces";

export default function makeTrackService({
  jarvis,
  cache,
}: DataSourceInterface) {
  return Object.freeze({
    get,
    list,
    search,
  });

  async function get(trackId: string) {
    try {
      const track = await jarvis.getTrack(trackId);
      return track;
    } catch (error) {
      throw error;
    }
  }
  async function list() {
    try {
      const cachedTrending = await cache.get("trending");

      if (cachedTrending) {
        return cachedTrending;
      }

      const trending = await jarvis.getTrending();
      await cache.set("trending", trending);
      return trending;
    } catch (error) {
      throw error;
    }
  }
  async function search(query: string) {
    try {
      const results = await jarvis.search(query);
      return results;
    } catch (error) {
      throw error;
    }
  }
}
