const db = require("./db/db");
const npb = require("./web-scraping/npb");

async function centralLeagueInsert(client, team) {
  await client.query(`INSERT INTO central_league (
    rank, name, playGameCount, win, lose,
    draw, pct, gameDiff, remainingMatch, run,
    ra, hr, sb, avg, era,
    pythagoreanExpectation
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ,$9, $10, $11, $12, $13, $14, $15, $16)`, [
    team.rank,
    team.name,
    team.playGameCount,
    team.win,
    team.lose,
    team.draw,
    team.pct,
    team.gameDiff,
    team.remainingMatch,
    team.run,
    team.ra,
    team.hr,
    team.sb,
    team.avg,
    team.era,
    team.pythagoreanExpectation,
  ]);
  console.log("success!");
}

async function main() {
  try {
    const client = await db.pool.connect();

    await client.query("BEGIN");
    await client.query("TRUNCATE TABLE central_league RESTART IDENTITY");
    npb.standings("CL").forEach(team => {
      centralLeagueInsert(client, team);
    });
    await client.query("COMMIT");

    await client.release();
  } catch (error) {
    console.error(error);
  }
}
main();
