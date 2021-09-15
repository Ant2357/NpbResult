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
  ])
});

// セ・リーグ
app.get('/cl', async (req, res) => {
  const client = await db.pool.connect();
  res.json(await clModel.all(client));
  client.release();
});

// パ・リーグ
app.get('/pl', async (req, res) => {
  const client = await db.pool.connect();
  res.json(await plModel.all(client));
  client.release();
});

// セ・パ交流戦
app.get('/cp', async (req, res) => {
  const client = await db.pool.connect();
  res.json(await cpModel.all(client));
  client.release();
});

// オープン戦
app.get('/op', async (req, res) => {
  const client = await db.pool.connect();
  res.json(await opModel.all(client));
  client.release();
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
