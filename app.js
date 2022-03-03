//app.js
const cors = require("cors");
const express = require("express");
// const bodyParser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 3001;
const rug = require("random-username-generator");

//let users = {};
let users = [];

// app.use(bodyParser.json());
app.use("/healthcheck", require("./routes/healthcheck.routes"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get("/", (req, res) => {
  headers = { http_status: 200, "cache-control": "no-cache" };
  body = { "status": "available" };
  res.status(200).send(body);
});

app.get("/highscores", (req ,res) => {
  headers={"http_status":200, "cache-control":  "no-cache"};
  users.sort((a, b) => b.score - a.score);
  res.status(200).send(users);
});

app.get("/registerscore", (req, res) => {
  headers = {"http_status": 200, "cache-control": "no-cache" };
  let user = req.query.user;
  let score = req.query.score;

  let data = {"user": user, "score": score}
  // users[user] = score;
  if(users.length <= 5){ // hardcoded to only show the top 5 for now
    users.push(data);
  }
  else if(score > users[4].score){
    users.splice(4, 1);
    users.push(data);
  }
  res.status(200).send({"status":"success"});
});

app.get('/auth', (req, res) => {
  let user = rug.generate();
  users[user] = 0;
  res.status(200).send({"user":user});
});

// app.post("/registerscore", (req ,res) => {
//   headers={"http_status":200, "cache-control":  "no-cache"}
//   let data = JSON.parse(req.body)
//   let user = data.user;
//   let score = data.score;
//   console.log(user + "->" + score)
//   users[user] = score;
//   res.status(200).send({"status":"success"});
// });

// app.post("/echo", (req, res) => {
//   console.log(JSON.stringify(req.body))
//   res.status(200).send(req.body)
// });

app.listen(PORT, () => {
  console.log(`STARTED LISTENING ON PORT ${PORT}`);
});


