const db = require("./db");
const clModel = require("./models/centralLeague");
const npb = require("./web-scraping/npb");

async function main() {
  try {
    const client = await db.pool.connect();
    clModel.updateAll(client, npb.standings("CL"));
    await client.release();
  } catch (error) {
    console.error(error);
  }
}
main();
