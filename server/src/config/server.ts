import express, { Request, Response } from "express";
import logger from "morgan";
import routes from "../api/routes";
import { Jarvis } from "../types";
import { NODE_ENV } from "./vars";
import { createClient } from "redis";
import makeCacheService from "./cache";
import { DataSourceInterface } from "../intefaces";

function makeServer(dataSource: DataSourceInterface) {
  const app = express();
  const router = express.Router();

  app.use(logger(NODE_ENV));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/api/v1", routes(router, dataSource));

  return app;
}

export default makeServer;
