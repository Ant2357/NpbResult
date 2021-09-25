const db = require("./db");
const clModel = require("./models/centralLeague");
const plModel = require("./models/pacificLeague");
const cpModel = require("./models/interleaguePlay");
const opModel = require("./models/exhibitionGame");
const npb = require("./web-scraping/npb");

async function main() {
  const client = await db.pool.connect();
  try {
    clModel.updateAll(client, npb.standings("CL"));
    plModel.updateAll(client, npb.standings("PL"));
    cpModel.updateAll(client, npb.standings("CP"));
    opModel.updateAll(client, npb.standings("OP"));
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
}
main();
