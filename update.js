const fs = require("fs");
const npb = require("./web-scraping/npb");

const jsonOutput = (url, data) => {
  fs.writeFile(url, JSON.stringify(data, null, "  "), err => {
    if (err) {
      throw err
    }
  });
};

const jsonPath = "./json";
try {
  jsonOutput([jsonPath, "/CL.json"].join(""), npb.standings("CL"));
  jsonOutput([jsonPath, "/PL.json"].join(""), npb.standings("PL"));
  jsonOutput([jsonPath, "/CP.json"].join(""), npb.standings("CP"));
  jsonOutput([jsonPath, "/OP.json"].join(""), npb.standings("OP"));
} catch (error) {
  console.error(error);
}
