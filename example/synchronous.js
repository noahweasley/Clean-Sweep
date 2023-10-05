const cleanSweep = require("clean-sweep");
const fileDirectory = "./";

try {
  cleanSweep.sweepSync(fileDirectory, { verbose: true });
} catch (err) {
  if (err.code == "ENOENT") {
    console.error("Directory does not exist");
  } else {
    console.error(err.message);
  }
}
