const client = require("cheerio-httpcli");
const BaseballTeam = require("./modules/baseballTeam");

/**
 * 順位表
 * 
 * 対応しているリーグ:
 * セリーグ: CL,
 * パリーグ: PL,
 * セ・パ交流戦: CP,
 * オープン戦: OP
 * @param {String} leagueName
 * @returns {Array}
 */
exports.standings = async (leagueName) => {
  const leagueUrls = {
    "CL": "1",
    "PL": "2",
    "CP": "26",
    "OP": "5"
  };
  const url = "https://baseball.yahoo.co.jp/npb/standings/detail/"
    + leagueUrls[(typeof leagueUrls[leagueName] === "undefined" ? "CL" : leagueName)];

  const web = await client.fetch(url);
  if (web.response.request.uri.href !== url) {
    return [];
  }

  const searchNum = leagueName === "OP" || leagueName === "CP" ? 12 : 6;
  let teams = [];
  web.$('.bb-rankTable > tbody > tr').each(function (idx) {
    if (idx < searchNum) {
      let team = new BaseballTeam();
      team.setStandings(web.$(this), leagueName);
      teams.push(team);
    }
  });

  return teams;
}
