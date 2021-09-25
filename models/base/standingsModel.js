const { Client } = require('pg');
const { clientConfig } = require("../../db");

module.exports = class StandingsModel {
  constructor(name) {
    this.tableName = name;
  }

  async all() {
    const client = new Client(clientConfig);

    try {
      await client.connect();

      const result = await client.query(`SELECT * FROM ${this.tableName}`);
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      await client.end();
    }
  }

  async updateAll(teams) {
    const client = new Client(clientConfig);

    try {
      await client.connect();

      await client.query("BEGIN");
      await client.query(`TRUNCATE TABLE ${this.tableName} RESTART IDENTITY`);
      teams.forEach(team => { this.executeInsertSql(client, team); });
      await client.query("COMMIT");

      console.log("Successfully updated!")
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      await client.end();
    }
  }

  async insert(team) {
    const client = new Client(clientConfig);

    try {
      await client.connect();
      executeInsertSql(client, team);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      await client.end();
    }
  }

  async executeInsertSql(client, team) {
    await client.query(`INSERT INTO ${this.tableName} (
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
  }
}