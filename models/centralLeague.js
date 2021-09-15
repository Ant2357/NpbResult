const tableName = "central_league";

module.exports = {
  async all(client) {
    const result = await client.query(`SELECT * FROM ${tableName}`)
    return result.rows;
  },

  async updateAll(client, teams) {
    await client.query("BEGIN");
    await client.query(`TRUNCATE TABLE ${tableName} RESTART IDENTITY`);
    teams.forEach(team => {
      this.insert(client, team);
    });
    await client.query("COMMIT");
  },

  async insert(client, team) {
    await client.query(`INSERT INTO ${tableName} (
      rank, name, play_game_count, win, lose,
      draw, pct, game_diff, remaining_games, run,
      ra, hr, sb, avg, era,
      pythagorean_expectation
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ,$9, $10, $11, $12, $13, $14, $15, $16)`, [
      team.rank,
      team.name,
      team.playGameCount,
      team.win,
      team.lose,
      team.draw,
      team.pct,
      team.gameDiff,
      team.remainingGames,
      team.run,
      team.ra,
      team.hr,
      team.sb,
      team.avg,
      team.era,
      team.pythagoreanExpectation,
    ]);
    console.log("CL Success!");
  }
};
