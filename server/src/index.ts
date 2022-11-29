import express, { Request, Response } from "express";

const app = express();
const port = 8000;

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello world!" });
});

app.listen(port, () => {
  console.log("App is running on port: " + port + ". http://localhost:" + port);
});
