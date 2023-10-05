const cleanSweep = require("clean-sweep").promises;
const fileDirectory = "./";

(async function () {
  try {
    await cleanSweep.sweep(fileDirectory, { verbose: true });
  } catch (err) {
    if (err.code == "ENOENT") {
      console.error("Directory does not exist");
    } else {
      console.error(err.message);
    }
  }
})();
