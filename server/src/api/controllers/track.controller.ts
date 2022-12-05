import { NextFunction, Request, Response } from "express";
import { DataSourceInterface } from "../../intefaces";
import { Jarvis } from "../../types";
import makeDigestService from "../services/digest.service";
import makeTrackService from "../services/track.service";
import makeApiResponse from "../utils/makeApiResponse";

export default function makeTrackController(dataSource: DataSourceInterface) {
  const service = makeTrackService(dataSource);

  async function get(req: Request, res: Response) {
    try {
      const trackId: string = req.params.id;
      const track = await service.get(trackId);
      return res.json(makeApiResponse({ data: track }));
    } catch (error) {
      res.status(500);
      return res.json(
        makeApiResponse({
          success: false,
          error: "Something went wrong",
        })
      );
    }
  }

  async function list(req: Request, res: Response) {
    try {
      const query = req.query.search_term;

      if (query) {
        const encodedQuery =
          typeof query === "string" ? encodeURIComponent(query) : "";
        const results = await service.search(encodedQuery);

        return res.json(makeApiResponse({ data: results }));
      }

      const trending = await service.list();
      return res.json(makeApiResponse({ data: trending }));
    } catch (error) {
      res.status(500);
      return res.json(
        makeApiResponse({
          success: false,
          error: "Something went wrong",
        })
      );
    }
  }

  return Object.freeze({
    get,
    list,
  });
}
