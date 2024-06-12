/* eslint-disable no-console */
const cleanSweep = require("../lib/sweep").promises;
const path = require("path");
const fileDirectory = path.join(__dirname, "testFolder");

(async function () {
  try {
    await cleanSweep.sweep(fileDirectory, { verbose: true, threshHold: 12 });
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error("Directory does not exist");
    } else {
      console.error(err.message);
    }
  }
})();
