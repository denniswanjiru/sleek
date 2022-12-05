import { createClient } from "redis";

import makeJarvis from "./jarvis";
import logger from "./config/logger";
import { PORT } from "./config/vars";
import makeServer from "./config/server";
import makeCacheService from "./config/cache";

const jarvis = makeJarvis();
const client = createClient();

const cache = makeCacheService(client);
const app = makeServer({ jarvis, cache });

app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
});
