import { Request, Response } from "express";
import { createClient } from "redis";
import makeCacheService from "./config/cache";
import logger from "./config/logger";
import makeServer from "./config/server";
import { PORT } from "./config/vars";

import makeJarvis from "./jarvis";

const jarvis = makeJarvis();
const client = createClient();

const cache = makeCacheService(client);
const app = makeServer({ jarvis, cache });

app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
});
