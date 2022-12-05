import makeCache from "../config/cache";
import makeJarvis from "../jarvis";

export type Artist = {
  name: string;
  avatar: string;
};

export type Track = {
  id: string;
  title: string;
  thumbnail: string;
  streamUrl?: string;
  publishedOn?: string;
  views?: number | string;
  duration: number | string;
  artist: Artist;
};

export type Playlist = {
  id: string;
  title: string;
  tracks: string;
  thumbnail: string;
  description: string;
};

export type Digest = {
  title: string;
  playlistsCount: number;
  playlists: Playlist[];
};

export type ApiResponse = {
  success?: boolean;
  data?: any | null;
  error?: string | null;
};

const jarvis = makeJarvis();
const cache = makeCache(null);

export type Jarvis = typeof jarvis;
export type CacheType = typeof cache;
