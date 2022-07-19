const ClModel = require("./models/centralLeagueModel");
const PlModel = require("./models/pacificLeagueModel");
const CpModel = require("./models/interleaguePlayModel");
const OpModel = require("./models/exhibitionGameModel");

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

    // 順位表
    await clModel.updateAll(await npb.standings("CL"));
    await plModel.updateAll(await npb.standings("PL"));
    await cpModel.updateAll(await npb.standings("CP"));
    await opModel.updateAll(await npb.standings("OP"));
  } catch (err) {
    console.error(err);
  }
}
main();
