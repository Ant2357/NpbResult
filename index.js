const db = require("./db");
const clModel = require("./models/centralLeague");
const plModel = require("./models/pacificLeague");
const cpModel = require("./models/interleaguePlay");
const opModel = require("./models/exhibitionGame");

const express = require('express');
const app = express();

app.use(express.json());

app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res) {
  res.json([
    { title: 'Central League', url: "/cl" },
    { title: 'Pacific League', url: "/pl" },
    { title: 'Interleague Play', url: "/cp" },
    { title: 'Exhibition game', url: "/op" }
  ]);
});

const resStandingsJson = async (res, model) => {
  try {
    const client = await db.pool.connect();
    res.json(await model.all(client));
    client.release();
  } catch (err) {
    console.error(err);
    res.json(err);
  }
};

// セ・リーグ
app.get('/cl', async (req, res) => {
  resStandingsJson(res, clModel);
});
// パ・リーグ
app.get('/pl', async (req, res) => {
  resStandingsJson(res, plModel);
});
// セ・パ交流戦
app.get('/cp', async (req, res) => {
  resStandingsJson(res, cpModel);
});
// オープン戦
app.get('/op', async (req, res) => {
  resStandingsJson(res, opModel);
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
