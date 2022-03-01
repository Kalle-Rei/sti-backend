//app.js
const cors = require("cors");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;
const rug = require('random-username-generator');

let users = {};

app.use("/healthcheck", require("./routes/healthcheck.routes"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  headers = { http_status: 200, "cache-control": "no-cache" };
  body = { status: "available" };
  res.status(200).send(body);
});

app.get("/registerscore", (req, res) => {
  headers = {http_status: 200, "cache-control": "no-cache" };
  let user = req.query.user;
  let score = req.query.score;
  users[user] = score;
  res.status(200).send({"status":"success"});
});

app.get("/post", (req ,res)=>{
  headers={"http_status":200, "cache-control":  "no-cache"}
  let user = req.body.user;
  let score = req.body.score;
  users[user] = score;
  res.status(200).send({"status":"success"});
});

app.get("/highscores", (req ,res)=>{
  headers={"http_status":200, "cache-control":  "no-cache"};
  res.status(200).send(users);
});

app.post('/echo', (req, res) => {
  console.log(JSON.stringify(req.body))
  res.status(200).send(req.body)
});

app.listen(PORT, () => {
  console.log(`STARTED LISTENING ON PORT ${PORT}`);
});
