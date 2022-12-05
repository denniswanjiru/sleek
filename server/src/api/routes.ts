import { Router } from "express";

import { DataSourceInterface } from "../intefaces";
import validate from "./middlewares/validate.middleware";
import { getDigest } from "./validations/digest.validations";
import makeTrackController from "./controllers/track.controller";
import makeDigestController from "./controllers/digest.controller";
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
