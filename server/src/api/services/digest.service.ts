import { Digest } from "../../types";
import { DataSourceInterface } from "../../intefaces";

export default function makeDigestService({
  jarvis,
  cache,
}: DataSourceInterface) {
  return Object.freeze({
    get,
  });

  async function get(): Promise<Digest[]> {
    try {
      const cachedDigest = await cache.get("digest");

      if (cachedDigest) {
        return cachedDigest;
      }

      const digest = await jarvis.getMusicDigest();
      await cache.set("digest", digest);
      return digest;
    } catch (error) {
      throw error;
    }
  }
}
