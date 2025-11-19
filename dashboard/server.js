const express = require("express");
const cors = require("cors");
const auth = require("./auth");
const rcon = require("./rcon");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/login", auth.login);

app.post("/command", auth.verify, async (req, res) => {
  const response = await rcon.send(req.body.cmd);
  res.json({ response });
});

app.get("/start", auth.verify, (req, res) => {
  exec("cd /path/to/server && ./start.sh");
  res.json({ ok: true });
});

app.get("/stop", auth.verify, () => {
  rcon.send("stop");
  res.json({ ok: true });
});

app.listen(3001, () => console.log("Dashboard API running"));
