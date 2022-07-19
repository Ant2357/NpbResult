const StarterModel = require("./models/starterModel");

const npb = require("./web-scraping/npb");

async function main() {
  try {
    // 予告先発
    const starterModel = new StarterModel();
    await starterModel.updateAll(await npb.starter());
  } catch (err) {
    console.error(err);
  }
}
main();
