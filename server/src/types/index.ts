export type Artist = {
  name: string;
  avatar: string;
};

export type Track = {
  id: string;
  title: string;
  thumbnail: string;
  streamUrl: string;
  publishedOn: string;
  views: number | string;
  duration: number | string;
  artist: Artist;
};
