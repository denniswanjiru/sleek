import { NextFunction, Request, Response } from "express";
import { DataSourceInterface } from "../../intefaces";
import { Jarvis } from "../../types";
import makeDigestService from "../services/digest.service";
import makeApiResponse from "../utils/makeApiResponse";

function makeDigestController(dataSource: DataSourceInterface) {
  const service = makeDigestService(dataSource);

  async function list(req: Request, res: Response) {
    try {
      const digest = await service.get();
      res.json(makeApiResponse({ data: digest }));
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
