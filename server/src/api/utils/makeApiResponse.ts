import { ApiResponse } from "../../types";

export default function makeApiResponse({
  data = null,
  error = null,
  success = true,
}: ApiResponse) {
  return Object.freeze({
    success,
    data: Object.freeze(data),
    error,
  });
}
