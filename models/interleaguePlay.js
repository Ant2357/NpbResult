module.exports = {
  async updateAll(client, teams) {
    await client.query("BEGIN");
    await client.query("TRUNCATE TABLE interleague_play RESTART IDENTITY");
    teams.forEach(team => {
      this.insert(client, team);
    });
    await client.query("COMMIT");
  },

  async insert(client, team) {
    await client.query(`INSERT INTO interleague_play (
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
    console.log("CP Success!");
  }
};