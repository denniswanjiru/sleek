import env from "dotenv";
import _StatusCodes from "http-status-codes";

env.config();

export const StatusCodes = _StatusCodes;
export const NODE_ENV = process.env.NODE_ENV || "dev";
export const PORT: number = Number(process.env.PORT || 1337);
