const cleanSweep = require("../lib/sweep");
const fileDirectory = "./";

try {
  cleanSweep.sweep(fileDirectory, { verbose: true });
} catch (err) {
  if (err.code == "ENOENT") {
    console.error("Directory does not exist");
  } else {
    console.error(err.message);
  }
}
