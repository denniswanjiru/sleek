import { object, number, string } from "yup";

const query = {
  query: object().shape({
    search: string(),
    limit: number().typeError("limit must be a number"),
    offset: number().typeError("offset must be a number"),
  }),
};

export const getDigest = object().shape({ ...query });
