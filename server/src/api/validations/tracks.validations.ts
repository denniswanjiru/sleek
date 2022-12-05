import { object, number, string } from "yup";

const query = {
  query: object().shape({
    search_term: string(),
    limit: number().typeError("limit must be a number"),
    offset: number().typeError("offset must be a number"),
  }),
};

const params = {
  params: object().shape({
    id: string().required(),
  }),
};

export const listTracks = object().shape({ ...query });
export const getTrack = object().shape({ ...params });
