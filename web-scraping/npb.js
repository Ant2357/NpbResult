const client = require("cheerio-httpcli");
const BaseballTeam = require("./modules/baseballTeam");
const Starter = require("./modules/starter");

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

/**
 * 予告先発
 * 
 * @returns {Array}
 */
exports.starter = async () => {
  const url = "https://baseball.yahoo.co.jp/npb/schedule/";

  const web = await client.fetch(url);
  if (web.response.request.uri.href !== url) {
    return [];
  }

  let ballparks = [];
  web.$(".bb-score__venue").each(function () {
    ballparks.push(web.$(this).text());
  });

  let teamNames = [];
  web.$(".bb-score__team").each(function () {
    teamNames.push(web.$(this).children().eq(0).text());
    teamNames.push(web.$(this).children().eq(1).text());
  });

  let starterNames = [];
  web.$(".bb-score__player").each(function () {
    starterNames.push(web.$(this).text());
  });


  let res = [];
  for (let i = 0; i < starterNames.length; i++) {
    if (i % 2 != 0) {
      continue;
    }

    let starter = new Starter(
      // 球場名
      ballparks[i / 2],
      // ホームチーム
      teamNames[i],
      // アウェーチーム
      teamNames[i + 1],
      //ホーム側の先発
      starterNames[i],
      //アウェー側の先発
      starterNames[i + 1]
    );

    res.push(starter);
  }

  return res;
}