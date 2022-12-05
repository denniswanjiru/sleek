import { Request, Response } from "express";

import { DataSourceInterface } from "../../intefaces";
import makeApiResponse from "../utils/makeApiResponse";
import makeDigestService from "../services/digest.service";

function makeDigestController(dataSource: DataSourceInterface) {
  const service = makeDigestService(dataSource);

  async function list(req: Request, res: Response) {
    try {
      const digest = await service.get();
      return res.json(makeApiResponse({ data: digest }));
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
    list,
  });
}

export default makeDigestController;
