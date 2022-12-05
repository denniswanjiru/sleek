import { Router, Express, Request, Response } from "express";
import { DataSourceInterface } from "../intefaces";
import { Jarvis } from "../types";
import makeDigestController from "./controllers/digest.controller";
import makeTrackController from "./controllers/track.controller";
import validate from "./middlewares/validate.middleware";
import { getDigest } from "./validations/digest.validations";
import { getTrack, listTracks } from "./validations/tracks.validations";

function routes(router: Router, dataSource: DataSourceInterface) {
  const digest = makeDigestController(dataSource);
  const track = makeTrackController(dataSource);

  // Endpoints
  router.route("/digest").get(validate(getDigest), digest.list);
  router.route("/tracks").get(validate(listTracks), track.list);
  router.route("/tracks/:id").get(validate(getTrack), track.get);

  return router;
}

export default routes;
