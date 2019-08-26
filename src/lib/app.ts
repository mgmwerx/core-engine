import express from "express";

const app = express();
app.use(express.json());

app.post("/events", (req, res) => {
  // WIP - this is just a placeholder that echoes the body received from the scraper client
  res.send(req.body);
});

app.get("/", (_req, res) => {
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
