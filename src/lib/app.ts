import express from "express";
import { routes as eventRoutes } from "./events/routes";

const app = express();
app.use(express.json());

app.use("/events", eventRoutes());
app.get("/", (_req, res) => {
  // Send a simple response to indicate the service is running
  res.send("ok");
});

app.use((_req, _res, next) => {
  next(404);
});

app.use((err, _req, res, _next) => {
  if (err === 404) {
    res.sendStatus(404);
  } else {
    res.sendStatus(500);
    process.stderr.write(err + "\n");
  }
});

export default app;
