const { Client } = require('pg');
const { clientConfig } = require("../db");

module.exports = class StarterModel {
  constructor() {
    this.tableName = "starter";
  }

  async all() {
    const client = new Client(clientConfig);

    try {
      await client.connect();

      const result = await client.query(`SELECT 
        ballpark, home_team_name, away_team_name, home_starter_name, away_starter_name,
        game_day
      FROM ${this.tableName}`);
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      await client.end();
    }
  }

  async updateAll(starters) {
    const client = new Client(clientConfig);

    try {
      await client.connect();

      await client.query("BEGIN");
      await client.query(`TRUNCATE TABLE ${this.tableName} RESTART IDENTITY`);
      starters.forEach(starter => { this.executeInsertSql(client, starter); });
      await client.query("COMMIT");

      console.log("Successfully updated!")
    } catch (err) {
      console.error(err);
      await client.query('ROLLBACK');
      throw err;
    } finally {
      await client.end();
    }
  }

  async insert(starter) {
    const client = new Client(clientConfig);

    try {
      await client.connect();
      executeInsertSql(client, starter);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      await client.end();
    }
  }

  async executeInsertSql(client, starter) {
    await client.query(`INSERT INTO ${this.tableName} (
      ballpark, home_team_name, away_team_name, home_starter_name, away_starter_name,
      game_day
    ) VALUES ($1, $2, $3, $4, $5, $6)`, [
      starter.ballpark,
      starter.homeTeamName,
      starter.awayTeamName,
      starter.homeStarterName,
      starter.awayStarterName,
      starter.gameDay,
    ]);
  }
}