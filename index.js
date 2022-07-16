const ClModel = require("./models/centralLeagueModel");
const PlModel = require("./models/pacificLeagueModel");
const CpModel = require("./models/interleaguePlayModel");
const OpModel = require("./models/exhibitionGameModel");

const StarterModel = require("./models/starterModel");

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res) {
  res.json([
    { title: 'Central League', url: "/cl" },
    { title: 'Pacific League', url: "/pl" },
    { title: 'Interleague Play', url: "/cp" },
    { title: 'Exhibition game', url: "/op" },
    { title: 'Starter', url: "/starter" }
  ]);
});

// セ・リーグ
app.get('/cl', async (req, res) => {
  const clModel = new ClModel();
  try {
    res.json(await clModel.all());
  } catch (err) {
    res.json(err);
  }
});

// パ・リーグ
app.get('/pl', async (req, res) => {
  const plModel = new PlModel();
  try {
    res.json(await plModel.all());
  } catch (err) {
    res.json(err);
  }
});

// セ・パ交流戦
app.get('/cp', async (req, res) => {
  const cpModel = new CpModel();
  try {
    res.json(await cpModel.all());
  } catch (err) {
    res.json(err);
  }
});

// オープン戦
app.get('/op', async (req, res) => {
  const opModel = new OpModel();
  try {
    res.json(await opModel.all());
  } catch (err) {
    res.json(err);
  }
});


// 予告先発
app.get('/starter', async (req, res) => {
  const starterModel = new StarterModel();
  try {
    res.json(await starterModel.all());
  } catch (err) {
    res.json(err);
  }
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
