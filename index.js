const clJson = require("./json/CL.json")
const plJson = require("./json/PL.json")
const cpJson = require("./json/CP.json")
const opJson = require("./json/OP.json")

const express = require('express');
const app = express();

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
app.get('/cl', function(req, res) {
  res.json(clJson);
});
// パ・リーグ
app.get('/pl', function(req, res) {
  res.json(plJson);
});
// セ・パ交流戦
app.get('/cp', function(req, res) {
  res.json(cpJson);
});
// オープン戦
app.get('/op', function(req, res) {
  res.json(opJson);
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
