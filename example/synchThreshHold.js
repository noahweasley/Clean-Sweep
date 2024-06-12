/* eslint-disable no-console */
const cleanSweep = require("../lib/sweep");
const path = require("path");
const fileDirectory = path.join(__dirname, "testFolder");

try {
  cleanSweep.sweepSync(fileDirectory, { verbose: true, threshHold: 9 });
} catch (err) {
  if (err.code === "ENOENT") {
    console.error("Directory does not exist");
  } else {
    console.error(err.message);
  }
}
