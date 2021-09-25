const ClModel = require("./models/centralLeague");
const PlModel = require("./models/pacificLeague");
const CpModel = require("./models/interleaguePlay");
const OpModel = require("./models/exhibitionGame");

const npb = require("./web-scraping/npb");

async function main() {
  try {
    // セ・リーグ
    const clModel = new ClModel();
    // パ・リーグ
    const plModel = new PlModel();
    // セ・パ交流戦
    const cpModel = new CpModel();
    // オープン戦
    const opModel = new OpModel();

    await clModel.updateAll(npb.standings("CL"));
    await plModel.updateAll(npb.standings("PL"));
    await cpModel.updateAll(npb.standings("CP"));
    await opModel.updateAll(npb.standings("OP"));
  } catch (err) {
    console.error(err);
  }
}
main();
