
module.exports = class Starter {

  /**
   *Creates an instance of Starter.
   */
  constructor(ballpark, homeTeamName, awayTeamName, homeStarterName, awayStarterName) {
    this.ballpark = ballpark;
    this.homeTeamName = homeTeamName;
    this.awayTeamName = awayTeamName;
    this.homeStarterName = homeStarterName;
    this.awayStarterName = awayStarterName;
  }
}
